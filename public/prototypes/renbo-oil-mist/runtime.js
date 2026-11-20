(() => {
  'use strict';
  const words = {
    filterMaintenance:['需换滤芯','Replace filter','フィルター交換'],
    prepareFilter:['压差偏高，请准备滤芯','High ΔP · Prepare a filter','差圧上昇・交換フィルターを準備'],
    replaceFilter:['压差过高，请更换滤芯','High ΔP · Replace the filter','差圧過大・フィルターを交換'],
    resetRequired:['待复位','Reset required','リセット待ち'],
    sessionSettings:['登录设置','Session settings','ログイン設定'],
    loginTimeoutMode:['退出方式','Sign-out rule','ログアウト条件'],
    absoluteTimeout:['固定时长','Fixed duration','固定時間'],
    idleTimeout:['无操作超时','Inactivity','無操作タイムアウト'],
    sessionExpired:['登录已超时，请重新登录','Session expired. Sign in again.','認証時間が切れました。再ログインしてください。'],
    wholeMinutes:['请输入 1–60 的整数分钟','Enter a whole number from 1 to 60 minutes','1～60の整数で分数を入力してください'],
    stageLabel:['级数','Stage','段'],
    thresholdBelow:['必须小于设定值 2','Must be below setting 2','設定値2より小さくしてください'],
    thresholdAbove:['必须大于设定值 1','Must be above setting 1','設定値1より大きくしてください'],
    zeroOrigin:['各级起点：0 Pa','All stages: 0 Pa','各段の起点：0 Pa'],
    dpRange:['压差表量程','ΔP gauge range','差圧計レンジ'],
    thresholdOrderError:['设定值 1 必须小于设定值 2','Setting 1 must be less than setting 2','設定値1は設定値2より小さくしてください'],
    notEnabled:['未启用','Not enabled','未使用'],
    noData:['无数据','No data','データなし'],
    brandLogo:['品牌 Logo','Brand logo','ブランドロゴ'],
    versionLabel:['版本号','Version','バージョン'],
    versionHint:['V 为固定前缀，请用数字键盘输入版本号，如 3.1.0','V is fixed. Use the keypad, e.g. 3.1.0','Vは固定です。数字キーで入力（例：3.1.0）'],
    versionError:['请输入数字版本号，点号需位于数字之间，如 3.1.0','Enter digits separated by dots, e.g. 3.1.0','数字をドットで区切って入力してください（例：3.1.0）'],
    levelSensor:['液位传感器','Level sensor','液位センサー'],
    discrete:['开关量','Discrete','デジタル'],
    analog:['模拟量','Analog','アナログ'],
    currentPressure:['当前压力','Current pressure','現在の圧力'],
    calibrate:['校准','Calibrate','校正'],
    calibrationValue:['校准值','Calibration value','校正値'],
    calibrationInitial:['读取初始值','Read initial values','初期値を読み込む'],
    equipmentChannels:['设备与压差','Equipment & ΔP','機能・差圧'],
    monitoringDisplay:['监测与显示','Monitoring & display','監視・表示'],
    displayAndSensor:['显示与传感器','Display & sensor','表示・センサー'],
    factoryLoginMinutes:['高级参数登录时长','Advanced settings timeout','詳細設定の認証時間'],
    sessionNextLogin:['下次登录时生效','Applies on the next sign-in','次回のログインから適用'],
    operationPermitted:['可继续运行','Operation permitted','運転継続可'],
    home:['主界面','Overview','運転画面'], settings:['设置','Settings','設定'], monitor:['参数','Monitoring','モニター'], alarms:['报警','Alarms','アラーム'],
    product:['油雾过滤控制系统','Oil Mist Control System','オイルミスト制御システム'],
    normal:['运行正常','System normal','正常運転'], warning:['运行报警','Warning','運転警報'], fault:['故障停机','Fault stop','異常停止'],
    faultText:['风机故障，设备已停机。请排查后复位。','Fan fault. System stopped. Inspect the fan before reset.','ファン異常により停止しました。点検後にリセットしてください。'],
    details:['查看详情','View details','詳細表示'], language:['语言选择','Language','言語選択'],
    manual:['手动','Manual','手動'],automatic:['自动','Auto','自動'],
    operationMode:['运行模式','Operating mode','運転モード'],
    switchToAuto:['点击切换为自动','Switch to auto','クリックで自動に切替'],switchToManual:['点击切换为手动','Switch to manual','クリックで手動に切替'],
    manualSelected:['已切换为手动模式','Manual mode selected','手動モードに切り替えました'],autoSelected:['已切换为自动模式','Auto mode selected','自動モードに切り替えました'],
    faultSummary:['风机故障 · 设备已停机','Fan fault · System stopped','ファン異常・装置停止'],
    restoredSummary:['异常已解除 · 待复位','Condition cleared · Reset required','異常解除済み・リセット待ち'],
    inlet:['入口压力','Inlet pressure','入口圧力'], frequency:['运行频率','Frequency','運転周波数'], previous:['上一页','Previous','前へ'], next:['下一页','Next','次へ'],
    dp1:['一级压差','Stage 1 ΔP','1段差圧'],dp2:['二级压差','Stage 2 ΔP','2段差圧'],dp3:['三级压差','Stage 3 ΔP','3段差圧'],dp4:['四级压差','Stage 4 ΔP','4段差圧'],
    pressureChannels:['压差通道','Differential pressure channels','差圧チャンネル'],channelDisabled:['未启用','Not enabled','未使用'],
    filterNormal:['压差正常','Normal','差圧正常'], filterWarning:['压差偏高','High pressure','差圧上昇'], filterFault:['设备停机','System stopped','装置停止'],
    equipment:['设备状态','SYSTEM STATUS','装置状態'],running:['运行中','Running','運転中'],stopped:['已停止','Stopped','停止中'],
    starting:['启动中','Starting','起動中'],stopping:['停止中','Stopping','停止処理中'],
    sessionRuntime:['本次运行','Current run','今回の運転'],
    local:['就地','Local','現場'],remote:['远程','Remote','遠隔'],vfd:['变频运行','Variable speed','インバーター'],fixed:['工频运行','Fixed speed','固定周波数'],
    start:['启动','Start','起動'],stop:['停止','Stop','停止'],pump:['回液泵','Return pump','回収ポンプ'],
    startTitle:['启动确认','Confirm startup','起動確認'],confirmStart:['确认启动','Start device','起動する'],
    startConfirm:['确认启动设备？确认后设备将进入启动流程。','Start the device? Confirm to begin the startup sequence.','装置を起動しますか？確認すると起動処理が始まります。'],
    pumpOn:['运行','Running','運転'],pumpOff:['停止','Stopped','停止'],
    pumpFault:['故障','Fault','異常'],
    pumpFlowDescription:['过滤回收油液经回液泵和回液管输送至指定容器','Filtered oil flows from the collection sump through the return pump and pipe into the receiving container','回収油を集油槽から回収ポンプと配管を通して指定容器へ送液'],
    driveMode:['驱动模式','Drive mode','駆動方式'],
    localReady:['就地控制，可启动','Local control · Ready to start','現場操作・起動可能'],
    localRunning:['就地控制，运行中','Local control · Running','現場操作・運転中'],
    remoteControl:['远程控制','Remote control','遠隔操作'],
    faultLocked:['故障未复位，禁止启动','Fault not reset · Start blocked','異常未リセット・起動不可'],
    remoteStart:['远程模式，请从远程启动','Remote mode · Start remotely','遠隔モード・遠隔側で起動'],
    user:['用户参数','User parameters','ユーザー設定'],advanced:['高级参数','Advanced settings','詳細設定'],
    login:['密码登录','Sign in','ログイン'],threshold:['压差设定','Pressure settings','差圧設定'],set1:['设定值 1','Setting 1','設定値 1'],set2:['设定值 2','Setting 2','設定値 2'],
    linkage:['运行模式','Control source','運転モード'],startDelay:['延时启动','Start delay','起動遅延'],stopDelay:['延时停机','Stop delay','停止遅延'],pressureTarget:['入口压力设定','Inlet pressure setting','入口圧力設定'],controlSettings:['运行控制','Operation control','運転制御'],
    editHint:['点击数值可修改设定','Tap a value to edit','数値をタップして変更'],features:['功能配置','Features','機能設定'],tuning:['控制调节','Control tuning','制御調整'],calibration:['压力校准','Calibration','圧力校正'],
    enable:['启用','Enable','有効'],disable:['停用','Disable','無効'],vfdFeature:['变频功能','Variable frequency','インバーター'],fireValve:['防火阀','Fire damper','防火ダンパー'],
    interval:['检测间隔','Detection interval','検出間隔'],deviation:['检测偏差','Pressure deviation','検出偏差'],steady:['稳态重检','Steady-state recheck','定常再検出'],pumpDelay:['回液泵延时','Pump delay','ポンプ遅延'],
    point:['测点','Channel','測定点'],current:['当前值','Current','現在値'],zero:['0 Pa 校准','0 Pa calibration','0 Pa 校正'],span:['3000 Pa 校准','3000 Pa calibration','3000 Pa 校正'],
    monitorTitle:['运行参数','Operating parameters','運転パラメーター'],readonly:['实时数据 · 只读','Live values · Read only','運転データ・表示専用'],
    inletConcentration:['入口浓度','Inlet concentration','入口濃度'],concentration:['出口浓度','Outlet concentration','出口濃度'],
    currentAmp:['运行电流','Motor current','運転電流'],voltage:['运行电压','Operating voltage','運転電圧'],noise:['风机噪音','Fan noise','ファン騒音'],vibration:['风机振动','Fan vibration','ファン振動'],airflow:['风机流量','Airflow','風量'],fan:['风机运行状态','Fan status','ファン状態'],
    filtrationStatus:['过滤器运行状态','Filtration status','ろ過運転状態'],totalRuntime:['总运行时间','Total run time','総運転時間'],
    alarmTitle:['报警记录','Alarm records','アラーム履歴'],alarmPagination:['报警记录翻页','Alarm record pagination','アラーム履歴のページ切替'],alarmOperations:['报警操作','Alarm actions','アラーム操作'],
    date:['日期','Date','日付'],time:['时间','Time','時刻'],object:['对象名','Source','対象'],alarmValue:['报警值','Value','警報値'],description:['报警描述','Description','警報内容'],status:['状态','Status','状態'],
    fanFault:['风机故障停机','Fan fault stop','ファン異常停止'],highInlet:['入口压力异常','Inlet pressure abnormal','入口圧力異常'],
    recovered:['已恢复','Recovered','復旧済'],active:['报警中','Active','警報中'],clearRecords:['清除记录','Clear records','履歴削除'],resetAlarm:['报警复位','Reset alarm','リセット'],empty:['暂无报警记录','No alarm records','アラーム履歴はありません'],reset:['复位','Reset','リセット'],
    enterPassword:['请输入密码','Enter password','パスワード入力'],passwordHint:['请输入高级参数密码','Enter the advanced settings password','詳細設定のパスワードを入力'],passwordError:['密码不正确，请重试','Incorrect password. Try again.','パスワードが違います'],
    cancel:['取消','Cancel','キャンセル'],confirm:['确认','Confirm','確認'],clear:['清除','Clear','クリア'],backspace:['退格','Backspace','一文字削除'],
    enterValue:['输入设定值','Enter value','設定値入力'],range:['范围','Range','範囲'],valueError:['请输入范围内的有效数值','Enter a valid value within the range','範囲内の数値を入力してください'],saved:['参数已保存','Parameter saved','設定を保存しました'],
    loginSuccess:['登录成功','Signed in','ログインしました'],resetDone:['报警已复位','Alarm reset','リセットしました'],resetBlocked:['报警条件仍存在，请排查后再复位','Alarm condition remains. Inspect before reset.','警報条件が継続中です。点検後にリセットしてください'],
    noReset:['当前没有需要复位的报警','No alarms to reset','リセット対象はありません'],clearConfirm:['确认清除报警历史记录？当前仍存在的报警会保留。','Clear alarm history? Active alarms will be retained.','履歴を削除しますか？現在のアラームは保持されます。'],recordsCleared:['历史记录已清除','History cleared','履歴を削除しました'],
    confirmClearRecords:['确认清除','Clear history','履歴を削除'],
    remoteBlocked:['远程模式下请通过远程指令启动','Use remote control to start in remote mode','遠隔モードでは遠隔側から起動してください'],startBlocked:['故障未解除，无法启动','Clear the fault before starting','異常を解除してから起動してください'],
    calibrated:['校准设定已保存','Calibration setting saved','校正値を保存しました'],alarmRestored:['异常已解除，可执行报警复位','Condition cleared. Alarm can now be reset.','異常解除済み・リセット可能'],
    runningNormal:['设备运行正常','System running normally','装置は正常運転中です'],
  };
  const iconPaths = {
    home:'<path fill="currentColor" stroke="none" d="M2 10.4 11.1 2.8a1.4 1.4 0 0 1 1.8 0l9.1 7.6v2.4h-2.3v8.7h-5.3v-6.6H9.6v6.6H4.3v-8.7H2z"/>',
    settings:'<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M10 2h4l.6 2.7 1.5.6 2.3-1.4 2.7 2.7-1.4 2.3.6 1.5 2.1.6v2l-2.1.6-.6 1.5 1.4 2.3-2.7 2.7-2.3-1.4-1.5.6L14 22h-4l-.6-2.7-1.5-.6-2.3 1.4-2.7-2.7 1.4-2.3-.6-1.5-2.1-.6v-2l2.1-.6.6-1.5-1.4-2.3 2.7-2.7 2.3 1.4 1.5-.6zM12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z"/>',
    monitor:'<path fill="currentColor" stroke="none" d="M3 11h4v7H3zm7-8h4v15h-4zm7 4h4v11h-4zM2 20h20v2H2z"/>',
    alarm:'<path fill="currentColor" stroke="none" d="M12 2a2 2 0 0 1 1.9 1.4A6.4 6.4 0 0 1 18.5 9v2.9c0 1.7.8 3.2 2.1 4.2.3.3.4.7.4 1.1v.8H3v-.8c0-.4.1-.8.4-1.1 1.3-1 2.1-2.5 2.1-4.2V9a6.4 6.4 0 0 1 4.6-5.6A2 2 0 0 1 12 2zm-3.2 18h6.4a3.4 3.4 0 0 1-6.4 0z"/>',
    warning:'<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M12 2 23 21.3H1zM10.8 8.4v5.9h2.4V8.4zM10.8 16.8v2.4h2.4v-2.4z"/>',
    check:'<path d="m4.5 12.5 4.8 4.6 10-10"/>',
    arrow:'<path d="m9 5.5 6.5 6.5L9 18.5"/>',
    previous:'<path d="m15 5.5-6.5 6.5 6.5 6.5"/>',
    globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    start:'<path fill="currentColor" stroke="none" d="M7 4.5v15l13-7.5z"/>',
    stop:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" stroke="none"/>',
    busy:'<path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5" stroke-width="3.5"/>',
    user:'<path fill="currentColor" stroke="none" d="M12 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM4 19a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2.5H4z"/>',
    sliders:'<path fill="currentColor" stroke="none" d="M3 5h4V2.5h3V5h11v2H10v2.5H7V7H3zm0 6h11V8.5h3V11h4v2h-4v2.5h-3V13H3zm0 6h4v-2.5h3V17h11v2H10v2.5H7V19H3z"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    backspace:'<path d="M8 5.5h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8L2.5 12zm3.5 3.5 6 6m0-6-6 6"/>',
    pressure:'<path d="M3 17a9 9 0 0 1 18 0M4.5 20h15M12 16l4-5"/><circle cx="12" cy="16" r="1.9" fill="currentColor" stroke="none"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l4 2.5"/>',
    fan:'<circle cx="12" cy="12" r="9.3"/><path fill="currentColor" stroke="none" d="M12 10.3c-2.6-1.5-3.4-4.6-.6-4.8 2.3-.1 2.8 2.6 1.6 4.8 2.7-1.4 5.6-.3 4.4 2.2-1 2-3.5 1.1-4.9-.7.2 3.1-2 5.4-3.7 3.3-1.2-1.8.5-3.7 2.8-4.3z"/><circle cx="12" cy="11.6" r="1.9" fill="currentColor" stroke="none"/>',
    motor:'<circle cx="12" cy="12" r="7.7"/><path d="M1.5 12H4m16 0h2.5"/><path d="M8.7 15v-6l3.3 3.2L15.3 9v6" stroke-width="2"/>',
    pump:'<path d="M16.8 12H21V6H11.8a6 6 0 1 0 5.6 8.3M7 20.5h10"/><circle cx="11.7" cy="12" r="2.2" fill="currentColor" stroke="none"/>',
    refresh:'<path d="M20 8.5a8.5 8.5 0 1 0 .1 6.8M20 3.5v5h-5"/>',
    trash:'<path d="M3.5 6.5h17M9 6.5V3.3h6v3.2M6 6.5l1 14h10l1-14M10.2 10.5v6m3.6-6v6"/>',
    drop:'<path fill="currentColor" stroke="none" d="M12 2.2c-2.7 4.7-7 8.9-7 12.7a7 7 0 1 0 14 0c0-3.8-4.3-8-7-12.7z"/>',
    vibration:'<path d="M2.5 12h3.8l2.8-7 5 14 3.3-7h4.1"/>',
    ammeter:'<circle cx="12" cy="12" r="7.7"/><path d="M1.5 12H4m16 0h2.5"/><path d="m9 15 3-6 3 6m-4.7-2h3.4" stroke-width="2"/>',
    voltmeter:'<circle cx="12" cy="12" r="7.7"/><path d="M1.5 12H4m16 0h2.5"/><path d="m9 9 3 6 3-6" stroke-width="2"/>',
    airflow:'<path d="M2.5 6.5h13m-13 5.5h19m-19 5.5h13M18 8.5l3.5 3.5-3.5 3.5"/>',
    noise:'<path fill="currentColor" stroke="none" d="M2 8.5h4.4L13 3.7v16.6l-6.6-4.8H2z"/><path d="M16.5 8.5a5 5 0 0 1 0 7m2.8-9.4a8.4 8.4 0 0 1 0 11.8"/>',
  };
  const icon=(name,size=20)=>`<svg data-icon="${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name]}</svg>`;
  const monitorFields=[
    {key:'inletConcentration',unit:'mg/m³',icon:'drop',digits:2,sample:1.85},
    {key:'concentration',unit:'mg/m³',icon:'drop',digits:2,sample:.12},
    {key:'airflow',unit:'m³/h',icon:'airflow',digits:0,sample:2400},
    {key:'currentAmp',unit:'A',icon:'ammeter',digits:1,sample:8.6},
    {key:'voltage',unit:'V',icon:'voltmeter',digits:0,sample:380},
    {key:'noise',unit:'dB(A)',icon:'noise',digits:0,sample:68},
    {key:'vibration',unit:'m/s',icon:'vibration',digits:1,sample:1.2},
  ];
  const featurePages=[
    {title:'equipmentChannels',items:[['vfd','vfdFeature'],['dp1','dp1'],['fan','fan'],['dp2','dp2'],['pump','pump'],['dp3','dp3'],['fireValve','fireValve'],['dp4','dp4']]},
    {title:'monitoringDisplay',items:[['inletConcentration','inletConcentration'],['concentration','concentration'],['currentAmp','currentAmp'],['voltage','voltage'],['airflow','airflow'],['noise','noise'],['vibration','vibration'],['inlet','inlet']]},
    {title:'displayAndSensor',items:[['levelSensor','levelSensor'],['logo','brandLogo'],['version','versionLabel']]},
  ];
  const levelSensorOptions=[['discrete','discrete'],['analog','analog']];
  const calibrationChannels=['inlet','dp1','dp2','dp3','dp4'];
  const calibrationPoints={zero:{reference:0,demoSample:12},span:{reference:3000,demoSample:2988}};
  const settingsTabKeys={user:['threshold','controlSettings'],factory:['features','tuning','calibration','sessionSettings']};
  const state={version:'V3.1.0',lang:1,page:'home',userTab:'threshold',factoryTab:'features',featurePage:0,running:true,transition:null,scenario:'warning',pumpRunning:true,pumpFault:false,linkage:'local',operationMode:'manual',modal:null,alarmPage:0,
    factorySession:null,loginTimeoutMode:'absolute',levelSensor:'discrete',readingSample:'normal',monitorSample:'normal',
    features:{...Object.fromEntries(monitorFields.map(field=>[field.key,true])),fan:true,vfd:true,inlet:true,logo:true,dp1:true,dp2:true,dp3:true,dp4:true,pump:true,fireValve:true},
    values:{factoryLoginMinutes:2,dpRange:2000,dp1a:800,dp1b:1200,dp2a:1000,dp2b:1500,dp3a:1200,dp3b:1800,dp4a:800,dp4b:1200,startDelay:5,stopDelay:10,pressureTarget:800,interval:5,deviation:50,steady:30,kp:1.2,ti:10,kd:0,td:1},
    calibrations:{},calibrationReady:false,calibrationResults:{},alarmHistory:[],alarmSeq:0,runStartedAt:performance.now(),runElapsedMs:0,accumulatedRunMs:0};
  const t=key=>words[key]?.[state.lang]??key;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function timeParts(date=new Date()) { return {date:new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(date),time:new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(date)}; }
  function addAlarm(kind,details={}){
    state.alarmHistory.unshift({id:++state.alarmSeq,kind,...timeParts(),active:true,condition:true,...details});
    state.alarmPage=0;
  }
  state.alarmHistory.push({id:++state.alarmSeq,kind:'inlet',date:timeParts().date,time:'08:16:24',active:false});
  const activeCount=()=>state.alarmHistory.filter(x=>x.active).length;
  const faultLatched=()=>state.alarmHistory.some(x=>x.active&&x.kind==='fault');
  function pressureLevel(channel,value){
    if(value>state.values[channel+'b'])return 'maintenance';
    return value>state.values[channel+'a']?'warning':'normal';
  }
  function syncAlarms(){
    state.alarmHistory.forEach(row=>{row.condition=false;});
    if(state.scenario==='fault'){
      const fault=state.alarmHistory.find(row=>row.active&&row.kind==='fault');
      if(fault)fault.condition=true;else addAlarm('fault');
    }
    if(!state.running)return;
    for(let index=1;index<=4;index++){
      const source='dp'+index;
      if(!state.features[source])continue;
      const value=differentialPressureTarget(index),level=pressureLevel(source,value);
      if(level==='normal')continue;
      const details={source,value,level,condition:true};
      const current=state.alarmHistory.find(row=>row.active&&row.kind==='dp'&&row.source===source);
      if(current)Object.assign(current,details);else addAlarm('dp',details);
    }
  }
  function alarmDescription(row){
    return t(row.kind==='fault'?'fanFault':row.kind==='inlet'?'highInlet':row.level==='maintenance'?'replaceFilter':'prepareFilter');
  }
  let factorySessionTimer;
  function endFactorySession(){
    clearTimeout(factorySessionTimer);
    state.factorySession=null;
    state.calibrationReady=false;
    state.calibrationResults={};
  }
  function expireFactorySession(){
    if(!state.factorySession||performance.now()<state.factorySession.deadline)return false;
    endFactorySession();
    state.page='user';state.modal=null;
    render();
    document.querySelector('[data-login="factory"]')?.focus();
    toast('sessionExpired');
    return true;
  }
  function scheduleFactoryExpiry(){
    clearTimeout(factorySessionTimer);
    const session=state.factorySession;
    if(session)factorySessionTimer=setTimeout(()=>{
      if(!expireFactorySession())scheduleFactoryExpiry();
    },Math.max(1,Math.ceil(session.deadline-performance.now())));
  }
  function startFactorySession(){
    const durationMs=state.values.factoryLoginMinutes*60000;
    state.factorySession={mode:state.loginTimeoutMode,durationMs,deadline:performance.now()+durationMs};
    scheduleFactoryExpiry();
  }
  function observeFactoryActivity(event){
    const session=state.factorySession;
    if(!session||!event.target.closest?.('#hmi'))return;
    if(expireFactorySession()){event.preventDefault();event.stopImmediatePropagation();return;}
    if(session.mode==='idle'){
      session.deadline=performance.now()+session.durationMs;
      scheduleFactoryExpiry();
    }
  }
  function canEditFactory(){return state.page==='factory'&&Boolean(state.factorySession)&&!expireFactorySession();}
  const isThreshold=key=>/^dp[1-4][ab]$/.test(key);
  const isUserValue=key=>isThreshold(key)||['startDelay','stopDelay','pressureTarget'].includes(key);
  function machineLabel(){return state.transition?t(state.transition):state.scenario==='fault'||faultLatched()?t('fault'):t(state.running?'running':'stopped');}
  function statusClass(){return state.scenario==='fault'||faultLatched()?'fault':state.running?'':'stopped';}
  let runtimeTimer;
  function runtimeElapsedMs(){return state.running?Math.max(0,performance.now()-state.runStartedAt):state.runElapsedMs;}
  function formatRuntime(seconds){return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(value=>String(value).padStart(2,'0')).join(':');}
  function updateRuntime(){
    clearTimeout(runtimeTimer);
    const clock=$('run-time');if(!clock)return;
    const elapsed=runtimeElapsedMs(),seconds=Math.floor(elapsed/1000);
    clock.textContent=formatRuntime(seconds);
    clock.dateTime=`PT${seconds}S`;
    const totalHours=$('total-run-hours'),hourMs=3600000;
    const totalElapsed=state.accumulatedRunMs+(state.running?elapsed:0);
    if(totalHours)totalHours.textContent=Math.floor(totalElapsed/hourMs).toLocaleString('en-US');
    if(state.running){
      const nextSecond=1000-elapsed%1000;
      const nextTick=totalHours?Math.min(nextSecond,hourMs-totalElapsed%hourMs):nextSecond;
      runtimeTimer=setTimeout(updateRuntime,Math.ceil(nextTick));
    }
  }
  function setRunning(run){
    if(state.running===run)return;
    if(run){state.runStartedAt=performance.now();state.runElapsedMs=0;}
    else{
      state.runElapsedMs=runtimeElapsedMs();
      state.accumulatedRunMs+=state.runElapsedMs;
      state.runStartedAt=null;
    }
    state.calibrationResults={};
    state.running=run;
  }
  function pumpState(){return !state.features.pump?'disabled':state.pumpFault?'fault':state.pumpRunning?'running':'stopped';}
  function machineCommand(){
    const action=state.running?'stop':'start';
    const blocked=!state.running&&(state.scenario==='fault'||faultLatched()||state.linkage==='remote');
    const hint=state.transition||(!state.running&&(state.scenario==='fault'||faultLatched())?'faultLocked':state.linkage==='remote'?(!state.running?'remoteStart':'remoteControl'):state.running?'localRunning':'localReady');
    return {action,blocked,hint};
  }
  function renderHeader(){
    const p=timeParts();
    const automatic=state.operationMode==='automatic';
    const modeLabel=`${t('operationMode')}：${t(state.operationMode)} · ${t(automatic?'switchToManual':'switchToAuto')}`;
    $('hmi-header').innerHTML=`<div class="header-brand">${state.features.logo?'<img class="logo" src="assets/rainbow-logo.svg" alt="RAINBOW">':''}</div>
      <div class="header-alarm-slot"><button class="header-alarm-banner" id="alarm-banner" data-page="alarms" hidden></button></div>
      <div class="header-right">
        <button class="language-button icon-button" data-action="language" aria-label="${t('language')}" title="${t('language')}">${icon('globe',20)}</button>
        <button class="icon-button operation-mode-button ${automatic?'automatic':''}" data-action="toggle-operation-mode" aria-label="${modeLabel}" title="${modeLabel}" aria-pressed="${automatic}"><span class="mode-glyph" aria-hidden="true">${automatic?'A':'M'}</span></button>
        <div class="clock" id="clock"><time id="clock-time" datetime="${p.date}T${p.time}+08:00">${p.time.slice(0,5)}</time><time class="clock-date" id="clock-date" datetime="${p.date}">${p.date.replaceAll('-','/')}</time></div>
      </div>`;
  }
  function renderAlarm(){
    const banner=$('alarm-banner');
    banner.hidden=activeCount()===0;
    if(banner.hidden)return;
    const conditions=state.alarmHistory.filter(row=>row.condition);
    const current=conditions.find(row=>row.kind==='fault')??conditions.find(row=>row.level==='maintenance')??conditions[0];
    const fault=current?.kind==='fault',restored=!current;
    const message=restored?t('alarmRestored'):fault?t('faultText'):`${t(current.source)} · ${alarmDescription(current)}`;
    const summary=restored?t('restoredSummary'):fault?t('faultSummary'):`${t(current.source)} · ${t(current.level==='maintenance'?'filterMaintenance':'filterWarning')} · ${t('operationPermitted')}`;
    banner.className=`header-alarm-banner ${fault?'fault':'warning'}`;
    banner.title=message;
    banner.setAttribute('aria-label',`${message} ${t('details')}`);
    banner.innerHTML=`<span class="header-alarm-symbol">${icon(restored?'check':'warning',20)}</span><span class="header-alarm-message">${summary}</span><span class="header-alarm-link" aria-hidden="true">${icon('arrow',16)}</span>`;
  }
  function renderNav(){
    const active=['user','factory'].includes(state.page)?'settings':state.page;
    const {action,blocked,hint}=machineCommand();
    const alarmCount=activeCount();
    const destinations=['home','alarms','monitor','settings'].map(key=>{
      const count=key==='alarms'?alarmCount:0;
      const label=t(key);
      return `<button class="nav-button ${active===key?'active':''}" data-page="${key}" aria-current="${active===key?'page':'false'}"${count?` aria-label="${label} ${count}"`:''}>
        <span class="nav-symbol" aria-hidden="true">${icon(key==='alarms'?'alarm':key,20)}${count?`<span class="nav-badge">${count}</span>`:''}</span><span>${label}</span>
      </button>`;
    }).join('');
    $('side-nav').innerHTML=destinations+`<div class="nav-runtime" role="group" aria-labelledby="run-time-label"><time id="run-time"></time><span id="run-time-label">${t('sessionRuntime')}</span></div><button class="nav-machine ${action}-button" data-action="${action}" title="${machineLabel()} · ${t(hint)}" aria-label="${t(state.transition||action)}" aria-description="${t(hint)}" aria-busy="${Boolean(state.transition)}" ${blocked||state.transition?'disabled':''}>${icon(state.transition?'busy':action,24)}</button>`;
  }
  const numberButton=(key,value,unit='',name=key,max=3000,min=0)=>`<button class="number-button" data-edit="${key}" data-title="${esc(name)}" data-unit="${unit}" data-min="${min}" data-max="${max}" aria-label="${esc([name,value,unit].join(' ').trim())}"><span>${value}</span>${unit?`<small>${unit}</small>`:''}</button>`;
  const segments=(key,options,current)=>`<div class="segmented">${options.map(([v,label])=>`<button data-segment="${key}" data-value="${v}" class="${String(current)===String(v)?'active':''}" aria-pressed="${String(current)===String(v)}">${t(label)}</button>`).join('')}</div>`;
  const pressureSegmentCount=20;
  function arcGaugeBlock(i,opacity=1){
    const outer=108,inner=96,corner=1.5,gap=2/102;
    const start=i*Math.PI/pressureSegmentCount+gap/2,end=(i+1)*Math.PI/pressureSegmentCount-gap/2;
    const point=(radius,angle)=>`${(116-radius*Math.cos(angle)).toFixed(3)} ${(112-radius*Math.sin(angle)).toFixed(3)}`;
    const d=`M${point(outer,start+corner/outer)} A${outer} ${outer} 0 0 1 ${point(outer,end-corner/outer)} Q${point(outer,end)} ${point(outer-corner,end)} L${point(inner+corner,end)} Q${point(inner,end)} ${point(inner,end-corner/inner)} A${inner} ${inner} 0 0 0 ${point(inner,start+corner/inner)} Q${point(inner,start)} ${point(inner+corner,start)} L${point(outer-corner,start)} Q${point(outer,start)} ${point(outer,start+corner/outer)} Z`;
    return `<path d="${d}" opacity="${opacity}"/>`;
  }
  function differentialPressureChart(ratio,enabled){
    const tracks=Array.from({length:pressureSegmentCount},(_,i)=>arcGaugeBlock(i)).join('');
    const values=enabled?Array.from({length:pressureSegmentCount},(_,i)=>arcGaugeBlock(i,clampProgress(ratio*pressureSegmentCount-i).toFixed(3))).join(''):'';
    return `<svg class="dp-chart" viewBox="0 0 232 128" aria-hidden="true">
      <g class="dp-chart-track">${tracks}</g>
      ${enabled?`<g class="dp-chart-value">${values}</g>`:''}
      <text class="dp-chart-scale" x="8" y="126" text-anchor="start">0</text>
      <text class="dp-chart-scale" x="224" y="126" text-anchor="end">${state.values.dpRange}</text>
    </svg>`;
  }
  function differentialPressureTarget(index){
    return [320,560,state.scenario==='warning'?1280:760,410][index-1];
  }
  const formatPressure=value=>Math.round(value).toLocaleString('en-US');
  function differentialPressureChannel(index,sample){
    const channel='dp'+index;
    const enabled=state.features[channel];
    const fault=enabled&&(state.scenario==='fault'||faultLatched());
    const reading=differentialPressureTarget(index)*sample.level;
    const level=pressureLevel(channel,state.running?differentialPressureTarget(index):0);
    const appearance=!enabled?'is-disabled':fault?'fault':level;
    const label=t({'is-disabled':'channelDisabled',fault:'filterFault',maintenance:'filterMaintenance',warning:'filterWarning',normal:'filterNormal'}[appearance]);
    const ratio=sample.sweep??reading/state.values.dpRange;
    return `<section class="dp-channel ${appearance}" data-channel="${channel}" role="group" aria-disabled="${!enabled}" aria-labelledby="${channel}-title">
      <div class="dp-heading">
        <div class="dp-title" id="${channel}-title">${icon('pressure',16)}${t(channel)}</div>
        <span class="dp-status" role="img" aria-label="${label}" title="${label}">${appearance==='fault'?icon('warning',16):''}</span>
      </div>
      <div class="dp-plot">
        ${differentialPressureChart(ratio,enabled)}
        <div class="dp-reading"><span data-dp-reading>${enabled?formatPressure(reading):'—'}</span>${enabled?'<small>Pa</small>':''}</div>
      </div>
    </section>`;
  }
  function pumpGraphic(){
    const pipe='M80 36h28a4 4 0 0 0 4-4v-8a4 4 0 0 1 4-4h84a4 4 0 0 1 4 4v12';
    return `<svg class="pump-graphic" viewBox="0 0 240 60" role="img" aria-label="${t('pumpFlowDescription')}">
      <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path class="pump-vessel" d="M4 34v18a4 4 0 0 0 4 4h88a4 4 0 0 0 4-4V34"/>
        <path class="pump-oil-fill" d="M6 46h92v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/>
        <path class="pump-oil-surface" d="M8 46c8-2 12 2 20 0s12 2 20 0h48"/>
        <g class="pump-motion"><path class="pump-source-drop" d="M24 26c-1 2-3 4-3 5a3 3 0 0 0 6 0c0-1-2-3-3-5z"/>
        <path class="pump-source-drop pump-source-drop-second" d="M44 26c-1 2-3 4-3 5a3 3 0 0 0 6 0c0-1-2-3-3-5z"/>
        </g>
        <g class="pump-machine">
          <rect class="pump-shell" x="64" y="30" width="16" height="22" rx="3"/>
          <path d="M68 38v9M76 38v9"/>
          <rect class="pump-shell" x="66" y="23" width="12" height="9" rx="2"/>
          <rect class="pump-shell" x="60" y="4" width="24" height="20" rx="4"/>
          <path d="M64 10h16M65 14v6M70 14v6M75 14v6M80 14v6M60 24h24"/>
          <path d="M62 32h20"/>
        </g>
        <path class="pump-pipe-outer" d="${pipe}"/>
        <path class="pump-pipe-inner" d="${pipe}"/>
        <path class="pump-pipe-oil" d="${pipe}"/>
        <g class="pump-motion"><path class="pump-flow" d="${pipe}"/></g>
        <path class="pump-vessel" d="M184 36v16a4 4 0 0 0 4 4h44a4 4 0 0 0 4-4V36"/>
        <path d="M182 36h8M230 36h8"/>
        <path class="pump-oil-fill" d="M186 46h48v6a2 2 0 0 1-2 2h-44a2 2 0 0 1-2-2z"/>
        <path class="pump-oil-surface" d="M188 46h44"/>
        <g class="pump-motion"><rect class="pump-fall" x="203" y="36" width="2" height="4" rx="1"/>
        <ellipse class="pump-ripple" cx="204" cy="46" rx="7" ry="1.5"/>
        </g>
      </g>
    </svg>`;
  }
  function chartMotion(attribute,from,to){
    if(operation||state.scenario==='fault'||faultLatched()||!Number.isFinite(from)||Math.abs(from-to)<0.001||reducedMotion.matches)return '';
    return `<animate attributeName="${attribute}" from="${from}" to="${to}" dur="240ms" calcMode="spline" keyTimes="0;1" keySplines=".2 .8 .2 1" fill="freeze"/>`;
  }
  function pressureChart(pressure){
    const ratio=Math.min(1,Math.abs(pressure)/2000);
    let tracks='',values='';
    for(const side of ['negative','positive']){
      for(let i=0;i<6;i++){
        const x=side==='negative'?97-i*19:126+i*19;
        const active=side==='negative'?pressure<0:pressure>0;
        const coverage=active?Math.min(1,Math.max(0,ratio*6-i)):0;
        const key=side+'-'+i;
        const previous=document.querySelector(`[data-pressure-segment="${key}"]`);
        const from=previous?Number(getComputedStyle(previous).opacity):coverage;
        tracks+=`<rect x="${x}" y="2" width="17" height="12" rx="2"/>`;
        values+=`<rect data-pressure-segment="${key}" x="${x}" y="2" width="17" height="12" rx="2" opacity="${coverage}">${chartMotion('opacity',from,coverage)}</rect>`;
      }
    }
    return `<svg class="pressure-chart" viewBox="0 0 240 32" aria-hidden="true">
      <g class="pressure-segment-track">${tracks}</g>
      <g class="pressure-segment-value">${values}</g>
      <path class="pressure-zero" d="M120 0v18"/>
      <g class="chart-scale" fill="#75869b" font-family="Arial,sans-serif"><text x="2" y="31">−2000</text><text class="zero-label" x="120" y="31" text-anchor="middle">0</text><text x="238" y="31" text-anchor="end">+2000</text></g>
    </svg>`;
  }
  function frequencyChart(frequency){
    const ratio=Math.max(0,Math.min(1,frequency/60));
    let tracks='',values='';
    for(let i=0;i<12;i++){
      const x=1+i*20,coverage=Math.min(1,Math.max(0,ratio*12-i));
      const previous=document.querySelector(`[data-frequency-segment="${i}"]`);
      const from=previous?Number(getComputedStyle(previous).opacity):coverage;
      tracks+=`<rect x="${x}" y="2" width="18" height="12" rx="2"/>`;
      values+=`<rect data-frequency-segment="${i}" x="${x}" y="2" width="18" height="12" rx="2" opacity="${coverage}">${chartMotion('opacity',from,coverage)}</rect>`;
    }
    return `<svg class="frequency-chart" viewBox="0 0 240 32" aria-hidden="true">
      <g class="frequency-segment-track">${tracks}</g>
      <g class="frequency-segment-value">${values}</g>
      <g class="chart-scale" fill="#75869b" font-family="Arial,sans-serif"><text x="2" y="31">0</text><text x="60" y="31" text-anchor="middle">15</text><text x="120" y="31" text-anchor="middle">30</text><text x="180" y="31" text-anchor="middle">45</text><text x="238" y="31" text-anchor="end">60</text></g>
    </svg>`;
  }
  function homeReading(key,level){
    const enabled=state.features.vfd&&(key!=='inlet'||state.features.inlet);
    if(!enabled)return {status:'disabled',value:null};
    if(state.readingSample==='missing')return {status:'unavailable',value:null};
    const raw=state.readingSample==='zero'?0:(key==='inlet'?-800:42.5);
    return {status:'valid',value:key==='inlet'?Math.round(raw*level):raw*level};
  }
  function formatHomeReading(key,value){
    if(value===null)return '—';
    return key==='frequency'?value.toFixed(1):value<0?'−'+Math.abs(value):String(value);
  }
  function homeReadingCard(key,level){
    const inlet=key==='inlet';
    const {status,value}=homeReading(key,level);
    return `<section class="reading-card ${inlet?'pressure':'frequency'}-card card" data-reading-state="${status}" aria-label="${t(key)}">
      <div class="reading-title">${icon(inlet?'pressure':'motor',16)}<span>${t(key)}</span>${status==='valid'?'':`<span class="reading-state">${t(status==='disabled'?'notEnabled':'noData')}</span>`}</div>
      <div class="reading-body metric-body">
        <div class="reading-value"><span data-${key}-reading>${formatHomeReading(key,value)}</span><small>${inlet?'Pa':'Hz'}</small></div>
        ${inlet?pressureChart(value??0):frequencyChart(value??0)}
      </div>
    </section>`;
  }
  function home(){
    const sample=homeMotionSample();
    const pump=pumpState(),pumpLabel=t(pump==='disabled'?'notEnabled':pump==='running'?'pumpOn':pump==='fault'?'pumpFault':'pumpOff');
    return `<div class="home-layout">
      <div class="dp-grid card" role="group" aria-label="${t('pressureChannels')}">${[1,2,3,4].map(index=>differentialPressureChannel(index,sample)).join('')}</div>
      <div class="home-readings">
        ${homeReadingCard('inlet',sample.level)}
        ${homeReadingCard('frequency',sample.level)}
        <section class="reading-card pump-card card ${pump}" data-reading-state="${pump==='disabled'?'disabled':'valid'}" aria-label="${t('pump')} · ${pumpLabel}">
          <div class="reading-title">${icon('pump',16)}<span>${t('pump')}</span>${pump==='disabled'?`<span class="reading-state">${pumpLabel}</span>`: `<span class="pump-status" role="img" aria-label="${pumpLabel}" title="${pumpLabel}"></span>`}</div>
          <div class="reading-body pump-body">${pumpGraphic()}</div>
        </section>
      </div>
    </div>`;
  }
  function heading(title,detail=''){
    return `<div class="page-heading"><h2>${t(title)}</h2>${detail}</div>`;
  }
  function settingsPage(){
    const advanced=state.page==='factory';
    return `<div class="settings-layout">
      <nav class="settings-nav card" aria-label="${t('settings')}">
        <button type="button" class="settings-nav-button" data-page="user" aria-current="${advanced?'false':'page'}">${icon('user')}<span>${t('user')}</span></button>
        <button type="button" class="settings-nav-button" data-login="factory" aria-current="${advanced?'page':'false'}" ${advanced?'':'aria-haspopup="dialog"'}>${icon('sliders')}<span>${t('advanced')}</span></button>
        <div class="settings-version" aria-label="${t('versionLabel')} ${esc(state.version)}">${esc(state.version)}</div>
      </nav>
      <div class="settings-content card">${advanced?factory():user()}</div>
    </div>`;
  }
  function settingsTabs(page,active,content){
    const panelId=`${page}-panel`;
    const tabs=settingsTabKeys[page].map(key=>{
      const selected=key===active;
      return `<button type="button" id="${page}-tab-${key}" role="tab" aria-selected="${selected}" aria-controls="${panelId}" tabindex="${selected?0:-1}" data-settings-tab="${key}">${t(key)}</button>`;
    }).join('');
    return `<div class="settings-tabs" role="tablist" aria-label="${t(page==='user'?'user':'advanced')}">${tabs}</div>
      <div id="${panelId}" class="${page}-panel ${active}" role="tabpanel" aria-labelledby="${page}-tab-${active}">${content}</div>`;
  }
  function user(){
    return settingsTabs('user',state.userTab,state.userTab==='threshold'?userThresholds():userControls());
  }
  function userThresholds(){
    const rows=[1,2,3,4].map(i=>{
      const channel=`dp${i}`;
      const label=t(channel);
      return `<tr data-threshold-channel="${channel}"><th scope="row">${label}</th>
        <td>${numberButton(channel+'a',state.values[channel+'a'],'Pa',label+' · ① '+t('set1'),65535)}</td>
        <td>${numberButton(channel+'b',state.values[channel+'b'],'Pa',label+' · ② '+t('set2'),65535)}</td></tr>`;
    }).join('');
    const legend=[['normal','filterNormal','0 ≤ ΔP ≤ ①'],['warning','filterWarning','① < ΔP ≤ ②'],['maintenance','filterMaintenance','ΔP > ②']].map(([appearance,label,range])=>`<div class="threshold-band ${appearance}"><span class="threshold-band-label"><i aria-hidden="true"></i>${t(label)}</span><span class="threshold-band-range">${range}</span></div>`).join('');
    return `<div class="threshold-fields"><table class="settings-table threshold-table" aria-labelledby="user-tab-threshold" aria-describedby="threshold-origin">
        <thead><tr><th scope="col">${t('stageLabel')}</th><th scope="col">① ${t('set1')}</th><th scope="col">② ${t('set2')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <div class="user-parameter-notes"><span id="threshold-origin">${t('zeroOrigin')}</span><div class="threshold-legend">${legend}</div></div>`;
  }
  function userControls(){
    const fields=[['startDelay','s',999],['stopDelay','s',999],['pressureTarget','Pa',3000]];
    return `<div class="user-control-fields">
      <div class="field-row"><span>${t('linkage')}</span>${segments('linkage',[['local','local'],['remote','remote']],state.linkage)}</div>
      ${fields.map(([key,unit,max])=>`<div class="field-row"><span>${t(key)}</span>${numberButton(key,state.values[key],unit,t(key),max)}</div>`).join('')}
    </div>`;
  }
  function factoryFeatures(){
    const page=featurePages[state.featurePage];
    const rows=page.items.map(([key,label])=>{
      let control;
      if(key==='version')control=`<button class="number-button version-button" data-action="edit-version" aria-label="${t(label)} ${esc(state.version)}">${esc(state.version)}</button>`;
      else if(key==='levelSensor')control=segments(key,levelSensorOptions,state.levelSensor);
      else control=segments('feature:'+key,[['true','enable'],['false','disable']],state.features[key]);
      return `<div class="feature-row"><span>${t(label)}</span>${control}</div>`;
    }).join('');
    return `<div class="feature-content" role="group" aria-label="${t(page.title)}"><div class="feature-grid${page.items.length<=4?' single-column':''}">${rows}</div></div><div class="feature-paging" role="group" aria-label="${t('features')}"><button class="button feature-page-button previous" data-feature-page="${state.featurePage-1}" ${state.featurePage===0?'disabled':''}>${icon('previous',16)}${t('previous')}</button><div class="feature-page-label" id="feature-page-label" tabindex="-1" aria-live="polite"><strong>${state.featurePage+1} / ${featurePages.length}</strong></div><button class="button feature-page-button" data-feature-page="${state.featurePage+1}" ${state.featurePage===featurePages.length-1?'disabled':''}>${t('next')}${icon('arrow',16)}</button></div>`;
  }
  function sessionSettings(){
    return `<div class="session-settings">
      <div class="field-row"><span>${t('factoryLoginMinutes')}</span>${numberButton('factoryLoginMinutes',state.values.factoryLoginMinutes,'min',t('factoryLoginMinutes'),60,1)}</div>
      <div class="field-row"><span>${t('loginTimeoutMode')}</span>${segments('loginTimeoutMode',[['absolute','absoluteTimeout'],['idle','idleTimeout']],state.loginTimeoutMode)}</div>
      <p class="settings-note">${t('sessionNextLogin')}</p>
    </div>`;
  }
  function calibrationReading(channel){
    if(channel==='inlet')return homeReading('inlet',state.running?1:0).value;
    return state.features[channel]?(state.running?differentialPressureTarget(Number(channel.slice(2))):0):null;
  }
  function factoryCalibration(){
    const ready=state.calibrationReady;
    const rows=calibrationChannels.map(channel=>{
      const reading=calibrationReading(channel);
      const available=Number.isFinite(reading);
      const current=available?(state.calibrationResults[channel]??reading):'—';
      const points=Object.entries(calibrationPoints).map(([point,{reference}])=>{
        const value=ready&&available?(state.calibrations[channel]?.[point]??reference):'—';
        const label=t(channel)+' · '+t(point);
        const valueId=`calibration-value-${channel}-${point}`;
        return `<td><div class="calibration-point"><button type="button" class="button" data-calibrate="${channel}" data-calibration-point="${point}" aria-label="${esc(t('calibrate')+' · '+label)}" aria-describedby="${valueId}" ${ready&&available?'':'disabled'}>${t('calibrate')}</button><output id="${valueId}" aria-label="${esc(t('calibrationValue'))}">${value}</output></div></td>`;
      }).join('');
      return `<tr><th scope="row">${t(channel)}</th><td class="calibration-value">${current} <small>Pa</small></td>${points}</tr>`;
    }).join('');
    const headings=Object.keys(calibrationPoints).map(point=>`<th scope="col">${t(point)}</th>`).join('');
    return `<div class="calibration-toolbar"><button type="button" class="button primary" data-action="read-calibration">${t('calibrationInitial')}</button></div>
      <table class="settings-table calibration-table" aria-labelledby="factory-tab-calibration">
        <thead><tr><th scope="col">${t('point')}</th><th scope="col">${t('currentPressure')}</th>${headings}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
  function factory(){
    let content='';
    if(state.factoryTab==='features')content=factoryFeatures();
    if(state.factoryTab==='tuning')content=`<div class="tuning-grid">${[['interval','s'],['kp',''],['deviation','Pa'],['ti',''],['steady','s'],['kd',''],['dpRange','Pa',65535,1],['td','']].map(([key,unit,max=3000,min=0])=>`<div class="field-row"><span>${words[key]?t(key):key.toUpperCase()}</span>${numberButton(key,state.values[key],unit,words[key]?t(key):key.toUpperCase(),max,min)}</div>`).join('')}</div>`;
    if(state.factoryTab==='calibration')content=factoryCalibration();
    if(state.factoryTab==='sessionSettings')content=sessionSettings();
    return settingsTabs('factory',state.factoryTab,content);
  }
  function selectSettingsTab(key){
    const page=state.page;
    if(!settingsTabKeys[page]?.includes(key)||(page==='factory'&&!canEditFactory()))return;
    if(page==='factory')state.factoryTab=key;
    else state.userTab=key;
    render();
    $(`${page}-tab-${key}`)?.focus();
  }
  function monitor(){
    const cards=Object.fromEntries(monitorFields.map(({key,unit,icon:symbol,digits,sample})=>{
      const status=!state.features[key]?'disabled':state.monitorSample==='missing'?'unavailable':'valid';
      const value=status==='valid'?(state.monitorSample==='zero'?0:sample).toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits}):'—';
      return [key,`<section class="monitor-card card" data-monitor-key="${key}" data-reading-state="${status}" aria-label="${t(key)}">
        <div class="monitor-label">${icon(symbol,16)}<span>${t(key)}</span>${status==='disabled'?`<span class="reading-state">${t('notEnabled')}</span>`:''}</div>
        <div class="monitor-value">${value}<small>${unit}</small></div>
        ${status==='unavailable'?`<div class="monitor-hint">${t('noData')}</div>`:''}
      </section>`];
    }));
    const fanEnabled=state.features.fan;
    cards.fan=`<section class="monitor-card monitor-fan card" data-monitor-key="fan" data-reading-state="${fanEnabled?'valid':'disabled'}" aria-label="${t('filtrationStatus')}">
      <div class="monitor-label">${icon('fan',16)}<span>${t('filtrationStatus')}</span>${fanEnabled?'':`<span class="reading-state">${t('notEnabled')}</span>`}</div>
      <div class="monitor-value ${statusClass()}">${fanEnabled?machineLabel():'—'}</div>
      ${fanEnabled?`<div class="monitor-hint">${t(state.features.vfd?'vfd':'fixed')} · ${t(state.linkage)}</div>`:''}
    </section>`;
    cards.totalRuntime=`<section class="monitor-card card" aria-label="${t('totalRuntime')}">
      <div class="monitor-label">${icon('clock',16)}${t('totalRuntime')}</div>
      <div class="monitor-value"><span id="total-run-hours"></span><small>h</small></div>
    </section>`;
    const order=['fan','currentAmp','vibration','inletConcentration','voltage','noise','concentration','airflow','totalRuntime'];
    return heading('monitorTitle',`<span class="heading-sub">${t('readonly')}</span>`)+`<div class="monitor-grid">${order.map(key=>cards[key]).join('')}</div>`;
  }
  const alarmPageSize=4;
  function alarmPageCount(){return Math.max(1,Math.ceil(state.alarmHistory.length/alarmPageSize));}
  function alarms(){
    const firstRecord=state.alarmPage*alarmPageSize;
    const rows=state.alarmHistory.slice(firstRecord,firstRecord+alarmPageSize).map(row=>`
      <tr class="${row.condition?(row.kind==='fault'||row.level==='maintenance'?'fault-row':'active-row'):''}">
        <td>${row.date}</td>
        <td>${row.time}</td>
        <td>${t(row.kind==='dp'?row.source:row.kind==='fault'?'fan':'inlet')}</td>
        <td>${row.kind==='dp'?`${formatPressure(row.value)} Pa`:row.kind==='fault'?'—':'−1200 Pa'}</td>
        <td>${alarmDescription(row)}</td>
        <td><span class="alarm-tag ${!row.condition?'recovered':row.kind==='fault'||row.level==='maintenance'?'fault':''}">${t(!row.active?'recovered':row.condition?'active':'resetRequired')}</span></td>
      </tr>`).join('');
    const pageCount=alarmPageCount();
    const records=rows?`<table class="alarm-table">
      <thead><tr>${['date','time','object','alarmValue','description','status'].map(key=>`<th scope="col">${t(key)}</th>`).join('')}</tr></thead>
      <tbody>${rows}</tbody>
    </table>`:`<div class="empty-state">${icon('check',24)}${t('empty')}</div>`;
    return `<div class="alarm-records">
      ${heading('alarmTitle')}
      <div class="alarm-table-wrap card">${records}</div>
      <div class="alarm-actions">
        <div class="alarm-paging" role="group" aria-label="${t('alarmPagination')}">
          <button class="paging-button" data-action="previous-records" aria-label="${t('previous')}" ${state.alarmPage===0?'disabled':''}>${icon('previous',16)}</button>
          <span class="alarm-page-number">${state.alarmPage+1} / ${pageCount}</span>
          <button class="paging-button" data-action="next-records" aria-label="${t('next')}" ${state.alarmPage+1>=pageCount?'disabled':''}>${icon('arrow',16)}</button>
        </div>
        <div class="alarm-operations" role="group" aria-label="${t('alarmOperations')}">
          <button class="button" data-action="clear-records">${icon('trash',16)}${t('clearRecords')}</button>
          <button class="button primary" data-action="reset-alarm">${icon('refresh',16)}${t('resetAlarm')}</button>
        </div>
      </div>
    </div>`;
  }
  function render(){
    if(expireFactorySession())return;
    syncAlarms();
    $('preview-version').textContent='交互原型 '+state.version;
    renderHeader();renderAlarm();renderNav();
    document.querySelectorAll('[data-pump-state]').forEach(button=>{
      button.classList.toggle('selected',button.dataset.pumpState===pumpState());
      button.disabled=!state.features.pump;
    });
    document.querySelectorAll('[data-reading-sample]').forEach(button=>button.classList.toggle('selected',button.dataset.readingSample===state.readingSample));
    document.querySelectorAll('[data-monitor-sample]').forEach(button=>button.classList.toggle('selected',button.dataset.monitorSample===state.monitorSample));
    const content=$('page-content');
    content.className=`page-content ${state.page==='home'?'home-page':''}`;
    content.innerHTML=({home,user:settingsPage,factory:settingsPage,monitor,alarms}[state.page]||home)();
    updateRuntime();
    if(operation)updateHomeMotion();
    renderModal();
  }
  let toastTimer;
  function toast(key){clearTimeout(toastTimer);$('toast').textContent=t(key);$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,2600);}
  function openModal(modal){if(controller&&!controller.hidden)setControllerOpen(false);state.modal=modal;renderModal();}
  function closeModal(restoreFocus=true){
    const modal=state.modal;
    const selector=modal?.intent==='start'?'.nav-machine':modal?.type==='language'?'.language-button':modal?.type==='login'?'[data-login="factory"]':modal?.type==='version'?'[data-action="edit-version"]':null;
    state.modal=null;
    renderModal();
    if(restoreFocus&&selector)document.querySelector(selector)?.focus();
  }
  function modalShell(title,body,cls='',footer=''){
    const useStandardOverlay=cls.includes('standard-modal')||cls.includes('keypad-modal');
    return `<div class="overlay${useStandardOverlay?' standard-overlay':''}"><section class="modal ${cls}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><h2>${title}</h2>${cls.includes('start-confirm-modal')?'':`<button class="close-button" data-action="close-modal" aria-label="${t('cancel')}">${icon('close',20)}</button>`}</div>${body}${footer}</section></div>`;
  }
  function renderModal(){
    const modal=state.modal,confirmation=modal?.type==='confirm',startConfirm=modal?.intent==='start';
    $('hmi-header').inert=confirmation;document.querySelector('.hmi-body').inert=confirmation;
    const languageButton=document.querySelector('.language-button');
    languageButton.setAttribute('aria-haspopup','menu');languageButton.setAttribute('aria-controls','language-menu');languageButton.setAttribute('aria-expanded',String(modal?.type==='language'));
    if(!modal){$('modal-root').innerHTML='';return;}
    if(modal.type==='language'){
      const options=['中文','English','日本語'].map((label,i)=>`<button class="language-option" data-language="${i}" role="menuitemradio" aria-checked="${state.lang===i}" tabindex="-1"><span>${label}</span></button>`).join('');
      $('modal-root').innerHTML=`<div class="language-dropdown" id="language-menu" role="menu" aria-label="${t('language')}">${options}</div>`;
      const screen=$('hmi').getBoundingClientRect(),anchor=languageButton.getBoundingClientRect(),scale=screen.width/800;
      $('language-menu').style.left=Math.max(8,Math.min(800-176-8,(anchor.right-screen.left)/scale-176))+'px';
      $('language-menu').style.top=(anchor.bottom-screen.top)/scale+8+'px';
      document.querySelector('.language-option[aria-checked="true"]').focus();return;
    }
    if(confirmation){
      $('modal-root').innerHTML=modalShell(t(modal.title),`<div class="confirm-body"><p>${t(modal.message)}</p></div>`,`confirm-modal${startConfirm?' standard-modal start-confirm-modal':''}`,`<div class="modal-actions"><button class="button" data-action="close-modal">${t('cancel')}</button><button class="button ${modal.danger?'danger':'primary'}" data-action="confirm-modal">${t(modal.confirmLabel||'confirm')}</button></div>`);
      document.querySelector('.confirm-modal .modal-actions [data-action="close-modal"]').focus();
      return;
    }
    const login=modal.type==='login',version=modal.type==='version';
    const title=login?`${t('advanced')} · ${t('login')}`:version?t('versionLabel'):modal.title;
    const unit=modal.unit?esc(modal.unit):'';
    const info=login?t('passwordHint'):version?t('versionHint'):`${t('range')} ${modal.min}–${modal.max}${unit?' '+unit:''}`;
    const first=isThreshold(modal.key)&&modal.key.endsWith('a');
    const related=isThreshold(modal.key)?state.values[modal.key.slice(0,-1)+(first?'b':'a')]:null;
    const digitKeys=keys=>keys.map(key=>`<button type="button" data-key="${key}" ${login&&key==='.'?'disabled':''}>${key}</button>`).join('');
    const keypad=`<div class="keypad-body">
      <div class="keypad-display">
        <div class="keypad-readout${modal.error?' is-invalid':''}">
          ${version?'<span class="keypad-unit" aria-hidden="true">V</span>':''}
          <input id="keypad-input" class="keypad-input" type="${login?'password':'text'}" inputmode="${login?'numeric':'decimal'}" autocomplete="off" aria-label="${t(login?'enterPassword':version?'versionLabel':'enterValue')}" aria-describedby="keypad-info keypad-error" aria-invalid="${Boolean(modal.error)}" maxlength="${version?11:12}" value="${esc(modal.value??'')}">
          ${unit?`<span class="keypad-unit" aria-hidden="true">${unit}</span>`:''}
        </div>
        <p class="keypad-info" id="keypad-info">${info}${related===null?'':` · ${t(first?'thresholdBelow':'thresholdAbove')} (${related} Pa)`}</p>
        <p class="keypad-error" id="keypad-error" role="alert" ${modal.error?'':'hidden'}>${modal.error?t(modal.error):''}</p>
      </div>
      <div class="keypad">
        ${digitKeys(['1','2','3'])}
        <button type="button" data-key="backspace" class="key-tool" aria-label="${t('backspace')}">${icon('backspace',24)}</button>
        ${digitKeys(['4','5','6'])}
        <button type="button" class="key-tool keypad-action" data-action="clear-input">${t('clear')}</button>
        ${digitKeys(['7','8','9','0','.'])}
        <button type="button" class="keypad-action keypad-submit" data-action="submit-input">${t(login?'login':'confirm')}</button>
      </div>
    </div>`;
    $('modal-root').innerHTML=modalShell(esc(title),keypad,'keypad-modal');
    const input=$('keypad-input');
    input.addEventListener('input',()=>updateKeypadValue(input));
    input.focus();input.select();
  }
  function updateKeypadValue(input){
    const modal=state.modal;
    modal.value=input.value;
    modal.fresh=false;
    if(!modal.error)return;
    modal.error=null;
    input.setAttribute('aria-invalid','false');
    input.closest('.keypad-readout').classList.remove('is-invalid');
    const message=$('keypad-error');
    message.textContent='';message.hidden=true;
  }
  function submitInput(){
    const modal=state.modal,input=$('keypad-input');
    if(!modal||!input||expireFactorySession())return;
    const value=input.value;
    const reject=error=>{modal.error=error;modal.value=value;modal.fresh=true;renderModal();};
    if(modal.type==='login'){
      if(state.page!=='user')return;
      if(value!=='8888'){modal.error='passwordError';modal.value='';renderModal();return;}
      startFactorySession();state.page='factory';closeModal(false);render();
      document.querySelector('.settings-nav [aria-current="page"]').focus();
      toast('loginSuccess');return;
    }
    if(modal.type==='version'){
      if(!canEditFactory())return;
      const version=value.trim();
      if(version.length>11||!/^\d+(?:\.\d+)*$/.test(version)){reject('versionError');return;}
      state.version='V'+version;closeModal(false);render();
      document.querySelector('[data-action="edit-version"]')?.focus();
      toast('saved');return;
    }
    if(modal.type!=='number'||(isUserValue(modal.key)?state.page!=='user':!canEditFactory()))return;
    const number=Number(value);
    if(!value.trim()||!Number.isFinite(number)||number<modal.min||number>modal.max){reject('valueError');return;}
    if(modal.key==='factoryLoginMinutes'&&!Number.isInteger(number)){reject('wholeMinutes');return;}
    if(isThreshold(modal.key)){
      const channel=modal.key.slice(0,-1);
      const first=modal.key.endsWith('a')?number:state.values[channel+'a'];
      const second=modal.key.endsWith('b')?number:state.values[channel+'b'];
      if(first>=second){reject('thresholdOrderError');return;}
    }
    state.values[modal.key]=number;closeModal(false);render();toast('saved');
  }
  function runCalibration(channel,point){
    if(!canEditFactory()||state.factoryTab!=='calibration'||!state.calibrationReady)return;
    if(!calibrationChannels.includes(channel)||!Object.hasOwn(calibrationPoints,point)||!Number.isFinite(calibrationReading(channel)))return;
    const {reference,demoSample}=calibrationPoints[point];
    // The selected reference affects only this simulated calibration screen.
    (state.calibrations[channel]??={})[point]=demoSample;
    state.calibrationResults[channel]=reference;
    render();
    const output=$(`calibration-value-${channel}-${point}`);
    output?.classList.add('is-updated');
    setTimeout(()=>output?.classList.remove('is-updated'),2000);
    document.querySelector(`[data-calibrate="${channel}"][data-calibration-point="${point}"]`)?.focus();
  }
  function setScenario(kind){
    cancelOperation();state.scenario=kind;state.calibrationResults={};state.transition=null;
    setRunning(kind!=='fault'&&!faultLatched());state.pumpRunning=state.features.pump&&state.running;
    document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.toggle('selected',b.dataset.scenario===kind));render();
  }
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let operation=null,operationTimer,operationFrame;
  const clampProgress=value=>Math.min(1,Math.max(0,value));
  const easeOut=value=>1-Math.pow(1-clampProgress(value),3);
  const easeInOut=value=>{const p=clampProgress(value);return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;};
  function homeMotionSample(){
    if(!operation||reducedMotion.matches)return {level:state.running?1:0,sweep:null,pumpOpacity:1};
    const elapsed=Math.max(0,performance.now()-operation.startedAt);
    if(!operation.run)return {level:1-easeOut(elapsed/700),sweep:null,pumpOpacity:1-easeOut((elapsed-450)/250)};
    // Only the arcs sweep to full scale; numerical readings stay at zero until settling.
    if(elapsed<450)return {level:0,sweep:easeInOut(elapsed/450),pumpOpacity:1};
    if(elapsed<800)return {level:0,sweep:1-easeOut((elapsed-450)/350),pumpOpacity:1};
    return {level:easeOut((elapsed-800)/400),sweep:null,pumpOpacity:1};
  }
  function updateHomeMotion(){
    if(state.page!=='home')return;
    const sample=homeMotionSample();
    for(let index=1;index<=4;index++){
      if(!state.features['dp'+index])continue;
      const card=document.querySelector(`[data-channel="dp${index}"]`);
      if(!card)continue;
      const reading=differentialPressureTarget(index)*sample.level;
      card.querySelector('[data-dp-reading]').textContent=formatPressure(reading);
      const segments=card.querySelectorAll('.dp-chart-value > *');
      const ratio=sample.sweep??reading/state.values.dpRange;
      segments.forEach((segment,i)=>segment.setAttribute('opacity',clampProgress(ratio*segments.length-i).toFixed(3)));
    }
    const pressure=homeReading('inlet',sample.level).value,frequency=homeReading('frequency',sample.level).value;
    document.querySelector('[data-inlet-reading]').textContent=formatHomeReading('inlet',pressure);
    document.querySelector('[data-frequency-reading]').textContent=formatHomeReading('frequency',frequency);
    document.querySelectorAll('[data-pressure-segment]').forEach(segment=>{
      const [side,index]=segment.dataset.pressureSegment.split('-');
      segment.setAttribute('opacity',side==='negative'?clampProgress(Math.abs(pressure)/2000*6-Number(index)).toFixed(3):0);
    });
    document.querySelectorAll('[data-frequency-segment]').forEach(segment=>segment.setAttribute('opacity',clampProgress(frequency/60*12-Number(segment.dataset.frequencySegment)).toFixed(3)));
    document.querySelector('.pump-graphic').style.setProperty('--pump-motion-opacity',sample.pumpOpacity);
  }
  function cancelOperation(){
    clearTimeout(operationTimer);cancelAnimationFrame(operationFrame);operation=null;
  }
  function finishOperation(){
    if(!operation)return;
    const run=operation.run;
    updateHomeMotion();cancelOperation();
    setRunning(run);state.transition=null;state.pumpRunning=run&&state.features.pump;render();
  }
  function animateOperation(){
    if(!operation)return;
    if(reducedMotion.matches||performance.now()-operation.startedAt>=operation.duration){finishOperation();return;}
    updateHomeMotion();operationFrame=requestAnimationFrame(animateOperation);
  }
  reducedMotion.addEventListener('change',()=>{if(operation)finishOperation();});
  function requestStart(){
    if(state.transition||state.running)return;
    if(machineCommand().blocked){toast(state.scenario==='fault'||faultLatched()?'startBlocked':'remoteBlocked');return;}
    openModal({type:'confirm',intent:'start',title:'startTitle',message:'startConfirm',confirmLabel:'confirmStart',onConfirm:()=>{closeModal();runMachine(true);}});
  }
  function runMachine(run){
    if(run&&(state.scenario==='fault'||faultLatched())){toast('startBlocked');return;}
    if(run&&state.linkage==='remote'){toast('remoteBlocked');return;}
    if(state.transition||state.running===run)return;
    state.transition=run?'starting':'stopping';
    operation={run,startedAt:performance.now(),duration:reducedMotion.matches?700:run?1200:700};
    render();
    operationTimer=setTimeout(finishOperation,operation.duration);
    if(!reducedMotion.matches)operationFrame=requestAnimationFrame(animateOperation);
  }
  function navigate(page){
    if(state.factorySession)endFactorySession();
    state.page=page==='settings'?'user':page;
    closeModal(false);render();
    if(page==='user')document.querySelector('.settings-nav [aria-current="page"]')?.focus();
  }
  for(const event of ['pointerdown','keydown','input','click'])document.addEventListener(event,observeFactoryActivity,true);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)expireFactorySession();});
  window.addEventListener('focus',expireFactorySession);
  document.addEventListener('click',event=>{
    if(state.modal?.type==='language'&&!event.target.closest('.language-dropdown,.language-button'))closeModal(false);
    const el=event.target.closest('button');if(!el||el.disabled)return;
    if(el.dataset.scenario){setScenario(el.dataset.scenario);return;}
    if(el.dataset.readingSample){state.readingSample=el.dataset.readingSample;state.calibrationResults={};render();return;}
    if(el.dataset.monitorSample){state.monitorSample=el.dataset.monitorSample;render();return;}
    if(el.dataset.pumpState){state.pumpFault=el.dataset.pumpState==='fault';state.pumpRunning=el.dataset.pumpState==='running'&&state.features.pump;render();return;}
    if(el.dataset.page){if(el.dataset.page!=='factory')navigate(el.dataset.page);return;}
    if(el.dataset.login==='factory'&&state.page==='user'){openModal({type:'login',value:'',fresh:true});return;}
    if(el.dataset.edit){
      const key=el.dataset.edit;
      if(!Object.hasOwn(state.values,key)||(isUserValue(key)?state.page!=='user':!canEditFactory()))return;
      openModal({type:'number',key,title:el.dataset.title,unit:el.dataset.unit,min:Number(el.dataset.min),max:Number(el.dataset.max),value:String(state.values[key]),fresh:true});
      return;
    }
    if(el.dataset.calibrate){runCalibration(el.dataset.calibrate,el.dataset.calibrationPoint);return;}
    if(el.dataset.featurePage!==undefined){
      const index=Number(el.dataset.featurePage);
      if(!canEditFactory()||!featurePages[index])return;
      state.featurePage=index;render();$('feature-page-label').focus();return;
    }
    if(el.dataset.segment){
      const key=el.dataset.segment,value=el.dataset.value;
      if(key==='linkage'){
        if(state.page!=='user'||!['local','remote'].includes(value))return;
        state.linkage=value;
      }else{
        if(!canEditFactory())return;
        if(key.startsWith('feature:')){
          const feature=key.slice(8);
          if(!Object.hasOwn(state.features,feature))return;
          state.features[feature]=value==='true';
          if(feature==='pump')state.pumpRunning=state.features.pump&&state.running;
          if(calibrationChannels.includes(feature)||feature==='vfd')state.calibrationResults={};
        }else if(key==='levelSensor'&&levelSensorOptions.some(([option])=>option===value))state.levelSensor=value;
        else if(key==='loginTimeoutMode'&&['absolute','idle'].includes(value))state.loginTimeoutMode=value;
        else return;
      }
      render();
      document.querySelector(`[data-segment="${key}"][aria-pressed="true"]`)?.focus();
      return;
    }
    if(el.dataset.settingsTab){selectSettingsTab(el.dataset.settingsTab);return;}
    if(el.dataset.language!==undefined){state.lang=Number(el.dataset.language);document.documentElement.lang=['zh-CN','en','ja'][state.lang];closeModal();render();document.querySelector('.language-button').focus();return;}
    if(el.dataset.key){
      const input=$('keypad-input'),m=state.modal,key=el.dataset.key;
      if(!input||!m)return;
      if(key==='backspace')input.value=input.value.slice(0,-1);
      else if(!(key==='.'&&(m.type==='login'||(m.type!=='version'&&!m.fresh&&input.value.includes('.')))))input.value=((m.fresh?'':input.value)+key).slice(0,input.maxLength);
      updateKeypadValue(input);input.focus();return;
    }
    switch(el.dataset.action){
      case 'read-calibration':
        if(canEditFactory()&&state.factoryTab==='calibration'){
          state.calibrationReady=true;state.calibrationResults={};render();
          document.querySelector('[data-action="read-calibration"]')?.focus();
        }
        break;
      case 'edit-version':
        if(canEditFactory())openModal({type:'version',value:state.version.slice(1),fresh:true});
        break;
      case 'language':if(state.modal?.type==='language')closeModal();else openModal({type:'language'});break;
      case 'toggle-operation-mode':state.operationMode=state.operationMode==='manual'?'automatic':'manual';render();document.querySelector('.operation-mode-button').focus();toast(state.operationMode==='automatic'?'autoSelected':'manualSelected');break;
      case 'start':requestStart();break;
      case 'stop':runMachine(false);break;
      case 'close-modal':closeModal();break;
      case 'clear-input':{
        const input=$('keypad-input');if(!input)break;
        input.value='';updateKeypadValue(input);input.focus();
        break;
      }
      case 'submit-input':submitInput();break;
      case 'confirm-modal':state.modal?.onConfirm?.();break;
      case 'previous-records':
      case 'next-records':{
        const action=el.dataset.action;
        state.alarmPage+=action==='next-records'?1:-1;
        render();
        const pager=document.querySelector('.alarm-paging');
        (pager.querySelector(`[data-action="${action}"]:enabled`)||pager.querySelector('button:enabled'))?.focus();
        break;
      }
      case 'clear-records':openModal({type:'confirm',title:'clearRecords',message:'clearConfirm',confirmLabel:'confirmClearRecords',danger:true,onConfirm:()=>{state.alarmHistory=state.alarmHistory.filter(row=>row.active);state.alarmPage=0;closeModal();render();toast('recordsCleared');}});break;
      case 'reset-alarm':if(state.alarmHistory.some(row=>row.condition)){toast('resetBlocked');}else if(activeCount()){state.alarmHistory.forEach(row=>row.active=false);render();toast('resetDone');}else toast('noReset');break;
    }
  });
  document.addEventListener('keydown',event=>{
    const tab=event.target.closest('[data-settings-tab]');
    if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      const keys=settingsTabKeys[state.page];
      const index=keys.indexOf(tab.dataset.settingsTab);
      const next=event.key==='Home'?0:event.key==='End'?keys.length-1:(index+(event.key==='ArrowLeft'?-1:1)+keys.length)%keys.length;
      event.preventDefault();selectSettingsTab(keys[next]);return;
    }
    if(event.target.closest('.language-button')&&['ArrowDown','ArrowUp'].includes(event.key)&&!state.modal){event.preventDefault();openModal({type:'language'});return;}
    if(!state.modal)return;
    if(state.modal.type==='language'){
      const options=Array.from(document.querySelectorAll('.language-option'));
      const index=options.indexOf(document.activeElement);
      if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
        event.preventDefault();
        const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
        options[next].focus();
      }
      if(event.key==='Escape'){event.preventDefault();closeModal();}
      if(event.key==='Tab')closeModal();
      if((event.key==='Enter'||event.key===' ')&&event.repeat)event.preventDefault();
      return;
    }
    if(state.modal.type==='confirm'){
      if(event.key==='Tab'){
        const buttons=Array.from(document.querySelectorAll('.confirm-modal button'));
        const index=buttons.indexOf(document.activeElement);
        event.preventDefault();buttons[(index+(event.shiftKey?-1:1)+buttons.length)%buttons.length].focus();
      }
      if(event.key==='Enter'){if(event.repeat||!event.target.closest('.confirm-modal button'))event.preventDefault();return;}
    }
    if(event.key==='Escape')closeModal();
    if(event.key==='Enter'&&!event.target.closest('.keypad-modal button')){event.preventDefault();submitInput();}
  });
  function resize(){
    const chosen=$('preview-scale').value;
    const availableWidth=Math.max(240,window.innerWidth-28);
    const availableHeight=Math.max(1,window.innerHeight-28);
    const maxScale=Math.min(1.5,availableWidth/800,availableHeight/480);
    const scale=chosen==='fit'?maxScale:Math.min(Number(chosen),maxScale);
    $('screen-stage').style.width=800*scale+'px';$('screen-stage').style.height=480*scale+'px';$('hmi').style.transform=`scale(${scale})`;
  }
  $('preview-scale').addEventListener('change',resize);window.addEventListener('resize',resize);
  const controllerToggle=$('preview-controller-toggle'),controller=$('preview-controller'),controllerClose=$('preview-controller-close');
  function setControllerOpen(open){
    controller.hidden=!open;
    controllerToggle.hidden=open;
    controllerToggle.setAttribute('aria-expanded',String(open));
    controller.setAttribute('aria-hidden',String(!open));
    if(open)controllerClose.focus();else controllerToggle.focus();
  }
  controllerToggle.addEventListener('click',()=>setControllerOpen(true));
  controllerClose.addEventListener('click',()=>setControllerOpen(false));
  setInterval(()=>{const p=timeParts(),clock=$('clock-time'),date=$('clock-date');if(clock){clock.textContent=p.time.slice(0,5);clock.dateTime=`${p.date}T${p.time}+08:00`;}if(date&&date.dateTime!==p.date){date.textContent=p.date.replaceAll('-','/');date.dateTime=p.date;}},1000);
  render();resize();
})();
