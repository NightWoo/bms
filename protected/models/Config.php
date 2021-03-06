<?php
Yii::import('application.models.AR.CarConfigAR');
Yii::import('application.models.AR.CarConfigListAR');
Yii::import('application.models.AR.ConfigSapMapAR');
Yii::import('application.models.AR.CarColorMapAR');
class Config
{
	private $configAR;

	protected function __construct($configAR) {
		$this->configAR = $configAR;
	}

	public static function create($configId=0) {
		if(empty($configId)){
			$configAR = new CarConfigAR();
		} else {
			$configAR = CarConfigAR::model()->findByPk($configId);
			if(empty($configAR)) {
				throw new Exception('no such car config');
			}
		}
		$c = __class__;
        $config = new $c($configAR);

		return $config;
	}

	public static function createByName($configName) {
		$configAR = CarConfigAR::model()->find('name=?', array($configId));
		if(empty($configAR)) {
            throw new Exception('no such car config');
        }

		$c = __class__;
        $config = new $c($configAR);

		return $config;
	}

	public function save ($data) {
		$data['user_id'] = Yii::app()->user->id;
		$data['modify_time'] = date("YmdHis");

		foreach($data as $key => $value) {
			$this->configAR->$key = $value;
		}
		$this->configAR->save();
	}

	public function getConfigSap () {
		$series = $this->configAR->car_series;
		$sql = "SELECT color FROM car_color_map WHERE series='$series'";
		$colors = Yii::app()->db->createCommand($sql)->queryColumn();
		$sapArray = array();
		foreach($colors as $color) {
			$sap = ConfigSapMapAR::model()->find('config_id=? AND color=?', array($this->configAR->id, $color));
			if(empty($sap)) {
				$sap = new ConfigSapMapAR();
				$sap->series = $series;
				$sap->config_id = $this->configAR->id;
				$sap->color= $color;
				$sap->save();
			}
			$sapArray[] = $sap;
		}
		return $sapArray;
	}	

	public function getDetail($car, $nodeName) {
		$node = Node::createByName($nodeName);
        if(!$node->exist()) {
            throw new Exception('node ' . $nodeName . ' is not exit');
        }
		$series = strtoupper($car->series);
		$ctClass = "ComponentTrace{$series}AR";
		Yii::import('application.models.AR.' .$ctClass);
		if(empty($node)) {
            $configLists = CarConfigListAR::model()->findAll('config_id=? AND istrace>0', array($this->configAR->id));
			$traceComponents = $ctClass::model()->findAll('car_id=?',array($car->id));
        } else {
        	$configLists = CarConfigListAR::model()->findAll('config_id=? AND node_id=? AND istrace>0', array($this->configAR->id, $node->id));
			//$traceComponents = $ctClass::model()->findAll('car_id=? AND node_id=?',array($car->id,$node->id));
			// modify by wujun
			// 检查某辆车某是否有某零部件的条码的记录，与当时条码在那个node扫描记录无关，
			// 比如，某零部件条码原来在T11工位已经进行记录，后来该零部件会被调到T21工位进行扫描记录，应还是认为该零部件已经进行过记录。
			$traceComponents = $ctClass::model()->findAll('car_id=?',array($car->id));
		}
			
		$datas = array();
		$traceList = array();
		foreach($traceComponents as $trace) {
			$traceList[$trace['component_id']] = $trace;
		}
		foreach($configLists as $configList) {
			$componentId = $configList['component_id'];
			$temp = $this->getComponent($componentId);
			$temp['provider_code'] = $this->getProvider($configList['provider_id']);
			$temp['bar_code'] = empty($traceList[$componentId]) ? '' : $traceList[$componentId]['bar_code'];
			$datas[] = $temp;
		}

		return $datas;
	}

	public function getProvider($providerId) {
		$sql = "SELECT code FROM provider WHERE id=$providerId";

		return Yii::app()->db->createCommand($sql)->queryScalar();
	}

	public function getComponent($componentId) {
		$sql = "SELECT id, display_name as name, code, simple_code, display_name FROM component WHERE id=$componentId";
		return Yii::app()->db->createCommand($sql)->queryRow();
	}

	//added by wujun
	public static function copyConfigList($originalId, $clonedId) {
		$seeker = new ConfigSeeker();
		$details = $seeker->getListDetail($originalId);
		if(!empty($details)){
			foreach($details as $detail) {
				$ar = new CarConfigListAR();
				$ar->config_id = $clonedId;
				$ar->user_id = Yii::app()->user->id;
				$ar->create_time = date("YmdHis");
				$ar->istrace = $detail['istrace'];
				$ar->provider_id = $detail['provider_id'];
				$ar->component_id = $detail['component_id'];
				$ar->replacement_id = $detail['replacement_id'];
				$ar->node_id = $detail['node_id'];
				$ar->remark = $detail['remark'];
				$ar->save();
			}
		} else {
			throw new Exception('there is no detail in this car_config');
		}			
	}

	public static function copyAccessoryList($originalId, $clonedId) {
		$seeker = new OrderConfigSeeker();
		$details = $seeker->getAccessoryList($originalId);
		if(!empty($details)){
			foreach($details as $detail) {
				$ar = new CarAccessoryListAR();
				$ar->order_config_id = $clonedId;
				$ar->user_id = Yii::app()->user->id;
				$ar->create_time = date("YmdHis");
				$ar->component_id = $detail['component_id'];
				$ar->remark = $detail['remark'];
				$ar->save();
			}
		} else {
			throw new Exception('there is no accessory detail in this order_config');
		}			
	}
}
