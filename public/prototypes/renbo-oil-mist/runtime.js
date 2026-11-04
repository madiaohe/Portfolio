(() => {
  'use strict';
  const initialVersion='V3.1.0';
  const words = {
    home:['主界面','Overview','運転画面'], settings:['设置','Settings','設定'], monitor:['参数','Monitoring','モニター'], alarms:['报警','Alarms','アラーム'],
    product:['油雾过滤控制系统','Oil Mist Control System','オイルミスト制御システム'],
    normal:['运行正常','System normal','正常運転'], warning:['运行报警','Warning','運転警報'], fault:['故障停机','Fault stop','異常停止'],
    noAlarm:['设备状态正常，当前无报警','System healthy. No active alarms.','装置正常・現在アラームはありません'],
    faultText:['风机故障，设备已停机。请排查后复位。','Fan fault. System stopped. Inspect the fan before reset.','ファン異常により停止しました。点検後にリセットしてください。'],
    details:['查看详情','View details','詳細表示'], language:['语言选择','Language','言語選択'],
    operationMode:['运行模式','Operating mode','運転モード'],userAccess:['用户','User','ユーザー'],
    signedOut:['未登录 · 点击登录','Signed out · Sign in','未ログイン・ログイン'],signedIn:['已登录','Signed in','ログイン済み'],
    userRole:['用户','User','ユーザー'],factoryRole:['厂家','Factory','メーカー'],currentAccount:['当前账号','Current account','現在のアカウント'],
    switchAccount:['切换账号','Switch account','アカウント切替'],signOut:['退出登录','Sign out','ログアウト'],back:['返回','Back','戻る'],enterSettings:['进入','Open','開く'],
    accountPasswordHint:['输入用户或厂家密码，自动识别身份','Enter a user or factory password','ユーザーまたはメーカーのパスワードを入力'],
    modeSettingsHint:['请在用户参数中配置运行模式','Configure the operating mode in User parameters','運転モードはユーザー設定で変更してください'],
    localSelected:['已切换为就地控制','Local control selected','現場操作に切り替えました'],remoteSelected:['已切换为远程控制','Remote control selected','遠隔操作に切り替えました'],
    faultSummary:['风机故障 · 设备已停机','Fan fault · System stopped','ファン異常・装置停止'],
    restoredSummary:['异常已解除 · 待复位','Condition cleared · Reset required','異常解除済み・リセット待ち'],
    inlet:['入口压力','Inlet pressure','入口圧力'], frequency:['运行频率','Frequency','運転周波数'], previous:['上一页','Previous','前へ'], next:['下一页','Next','次へ'],
    dp1:['一级压差','Stage 1 ΔP','1段差圧'],dp2:['二级压差','Stage 2 ΔP','2段差圧'],dp3:['三级压差','Stage 3 ΔP','3段差圧'],dp4:['四级压差','Stage 4 ΔP','4段差圧'],
    pressureChannels:['压差通道','Differential pressure channels','差圧チャンネル'],noPressureChannels:['未启用压差通道','No pressure channels enabled','差圧チャンネルが無効です'],
    filterNormal:['压差正常','Normal','差圧正常'], filterWarning:['压差偏高','High pressure','差圧上昇'], filterFault:['设备停机','System stopped','装置停止'],filterMaintenance:['需换滤芯','Replace filter','フィルター交換'],
    prepareFilter:['压差偏高，请准备滤芯','High ΔP · Prepare a filter','差圧上昇・交換フィルターを準備'],replaceFilter:['压差过高，请更换滤芯','High ΔP · Replace the filter','差圧過大・フィルターを交換'],
    resetRequired:['待复位','Reset required','リセット待ち'],
    equipment:['设备状态','SYSTEM STATUS','装置状態'],running:['运行中','Running','運転中'],stopped:['已停止','Stopped','停止中'],
    starting:['启动中','Starting','起動中'],stopping:['停止中','Stopping','停止処理中'],
    sessionRuntime:['运行时间','Run time','運転時間'],runningStatus:['运行状态','Run status','運転状態'],
    local:['就地','Local','現場'],remote:['远程','Remote','遠隔'],vfd:['变频运行','Variable speed','インバーター'],fixed:['工频运行','Fixed speed','固定周波数'],
    powerControl:['设备启停','Equipment start/stop','装置の起動・停止'],powerStartHelp:['点击启动设备','Press to start the equipment','押すと装置を起動します'],powerStopHelp:['点击停止设备','Press to stop the equipment','押すと装置を停止します'],
    powerBusyHelp:['正在执行，请稍候','Command in progress','処理中です'],powerFault:['故障锁定','Fault locked','異常ロック'],powerResetFirst:['请先复位故障','Reset fault first','先に異常をリセット'],powerRemote:['请从远程启动','Remote start only','遠隔側で起動'],powerRemoteGuide:['远程启动','Remote only','遠隔起動'],
    start:['启动','Start','起動'],stop:['停止','Stop','停止'],pump:['回液泵','Return pump','回収ポンプ'],
    pumpOn:['运行','Running','運転'],pumpOff:['停止','Stopped','停止'],
    pumpFault:['故障','Fault','異常'],pumpFeedback:['状态反馈','Status feedback','状態表示'],
    pumpFlowDescription:['过滤回收油液经回液泵和回液管输送至指定容器','Filtered oil flows from the collection sump through the return pump and pipe into the receiving container','回収油を集油槽から回収ポンプと配管を通して指定容器へ送液'],
    driveMode:['驱动模式','Drive mode','駆動方式'],
    localReady:['就地控制，可启动','Local control · Ready to start','現場操作・起動可能'],
    localRunning:['就地控制，运行中','Local control · Running','現場操作・運転中'],
    remoteControl:['远程控制','Remote control','遠隔操作'],
    faultLocked:['故障未复位，禁止启动','Fault not reset · Start blocked','異常未リセット・起動不可'],
    remoteStart:['远程模式，请从远程启动','Remote mode · Start remotely','遠隔モード・遠隔側で起動'],
    sessionSettings:['登录设置','Session settings','ログイン設定'],userLoginMinutes:['用户登录时长','User timeout','ユーザー認証時間'],factoryLoginMinutes:['厂家登录时长','Factory timeout','メーカー認証時間'],
    loginTimeoutMode:['退出方式','Sign-out rule','ログアウト条件'],absoluteTimeout:['固定时长','Fixed duration','固定時間'],idleTimeout:['无操作超时','Inactivity','無操作タイムアウト'],
    sessionExpired:['登录已超时，请重新登录','Session expired. Sign in again.','認証時間が切れました。再ログインしてください。'],signInRequired:['请使用对应权限重新登录','Sign in with the required access level','必要な権限でログインしてください'],wholeMinutes:['请输入 1–60 的整数分钟','Enter a whole number from 1 to 60 minutes','1～60の整数で分数を入力してください'],
    pendingAlarms:['待处理','Unresolved','未処理'],
    settingsTitle:['参数设置','Parameter settings','パラメーター設定'],accessHint:['选择权限后登录','Select access level','権限を選択してログイン'],
    user:['用户参数','User parameters','ユーザー設定'],manufacturer:['厂家参数','Factory parameters','メーカー設定'],
    userDescription:['压差设定、就地／远程、启停延时及入口压力设定','Pressure limits, local/remote mode, start/stop delays and inlet pressure','差圧設定・現場／遠隔切替・起動停止遅延・入口圧力設定'],factoryDescription:['功能配置、控制调节及传感器校准','Features, control tuning and sensor calibration','機能設定・制御調整・センサー校正'],
    login:['密码登录','Sign in','ログイン'],logout:['退出','Exit','終了'],threshold:['压差设定','Pressure settings','差圧設定'],set1:['设定值 1','Setting 1','設定値 1'],set2:['设定值 2','Setting 2','設定値 2'],
    linkage:['运行模式','Control source','運転モード'],startDelay:['延时启动','Start delay','起動遅延'],stopDelay:['延时停机','Stop delay','停止遅延'],pressureTarget:['入口压力设定','Inlet pressure setting','入口圧力設定'],controlSettings:['运行控制','Operation control','運転制御'],
    stageLabel:['级数','Stage','段'],rangeStart:['起点','Start','起点'],thresholdBelow:['必须小于设定值 2','Must be below setting 2','設定値2より小さくしてください'],thresholdAbove:['必须大于设定值 1','Must be above setting 1','設定値1より大きくしてください'],
    zeroOrigin:['各级起点：0 Pa','All stages: 0 Pa','各段の起点：0 Pa'],
    dpRange:['压差表量程','ΔP gauge range','差圧計レンジ'],thresholdOrderError:['设定值 1 必须小于设定值 2','Setting 1 must be less than setting 2','設定値1は設定値2より小さくしてください'],
    editHint:['点击数值可修改设定','Tap a value to edit','数値をタップして変更'],features:['功能配置','Features','機能設定'],tuning:['控制调节','Control tuning','制御調整'],calibration:['压力校准','Calibration','圧力校正'],
    notEnabled:['未启用','Not enabled','未使用'],noData:['无数据','No data','データなし'],brandLogo:['品牌 Logo','Brand logo','ブランドロゴ'],systemVersion:['系统版本','System version','システムバージョン'],
    versionLabel:['版本号','Version','バージョン'],
    versionHint:['V 为固定前缀，请用数字键盘输入版本号，如 3.1.0','V is fixed. Use the keypad, e.g. 3.1.0','Vは固定です。数字キーで入力（例：3.1.0）'],
    versionError:['请输入数字版本号，点号需位于数字之间，如 3.1.0','Enter digits separated by dots, e.g. 3.1.0','数字をドットで区切って入力してください（例：3.1.0）'],
    enable:['启用','Enable','有効'],disable:['停用','Disable','無効'],vfdFeature:['变频功能','Variable frequency','インバーター'],fireValve:['防火阀','Fire damper','防火ダンパー'],
    interval:['检测间隔','Detection interval','検出間隔'],deviation:['检测偏差','Pressure deviation','検出偏差'],steady:['稳态重检','Steady-state recheck','定常再検出'],
    point:['测点','Channel','測定点'],current:['当前值','Current','現在値'],zero:['0 Pa 校准','0 Pa calibration','0 Pa 校正'],span:['3000 Pa 校准','3000 Pa calibration','3000 Pa 校正'],
    equipmentChannels:['设备与压差','Equipment & ΔP','機能・差圧'],monitoringDisplay:['监测与显示','Monitoring & display','監視・表示'],homeDisplay:['首页显示','Home display','運転画面表示'],totalRuntime:['总运行时间','Total run time','総運転時間'],
    inletConcentration:['入口浓度','Inlet concentration','入口濃度'],voltage:['运行电压','Operating voltage','運転電圧'],
    monitorTitle:['运行参数','Operating parameters','運転パラメーター'],readonly:['实时数据 · 只读','Live values · Read only','運転データ・表示専用'],
    concentration:['出口浓度','Outlet concentration','出口濃度'],currentAmp:['运行电流','Motor current','運転電流'],noise:['风机噪音','Fan noise','ファン騒音'],vibration:['风机振动','Fan vibration','ファン振動'],airflow:['风机流量','Airflow','風量'],fan:['风机运行状态','Fan status','ファン状態'],
    filtrationStatus:['过滤器运行状态','Filtration status','ろ過運転状態'],
    alarmTitle:['当前报警','Current alarms','現在の警報'],activeAlarms:['当前报警','Active alarms','現在の警報'],
    date:['日期','Date','日付'],time:['时间','Time','時刻'],object:['对象名','Source','対象'],alarmValue:['报警值','Value','警報値'],description:['报警描述','Description','警報内容'],status:['状态','Status','状態'],
    highDp:['压差偏高，请检查滤芯','High differential pressure','差圧上昇・フィルター点検'],fanFault:['风机故障停机','Fan fault stop','ファン異常停止'],highInlet:['入口压力异常','Inlet pressure abnormal','入口圧力異常'],
    active:['报警中','Active','警報中'],resetAlarm:['报警复位','Reset alarm','リセット'],empty:['当前无报警','No current alarms','現在、警報はありません'],reset:['复位','Reset','リセット'],
    enterPassword:['请输入密码','Enter password','パスワード入力'],passwordHint:['请输入对应权限的登录密码','Enter the password for this access level','選択した権限のパスワードを入力'],passwordError:['密码不正确，请重试','Incorrect password. Try again.','パスワードが違います'],
    cancel:['取消','Cancel','キャンセル'],confirm:['确认','Confirm','確認'],clear:['清空','Clear','クリア'],backspace:['退格','Delete','削除'],
    enterValue:['输入设定值','Enter value','設定値入力'],range:['输入范围','Range','入力範囲'],valueError:['请输入范围内的有效数值','Enter a valid value within the range','範囲内の数値を入力してください'],saved:['参数已保存','Parameter saved','設定を保存しました'],
    loginSuccess:['登录成功','Signed in','ログインしました'],resetDone:['报警已复位','Alarm reset','リセットしました'],resetBlocked:['报警条件仍存在，请排查后再复位','Alarm condition remains. Inspect before reset.','警報条件が継続中です。点検後にリセットしてください'],
    noReset:['当前没有需要复位的报警','No alarms to reset','リセット対象はありません'],
    remoteBlocked:['远程模式下请通过远程指令启动','Use remote control to start in remote mode','遠隔モードでは遠隔側から起動してください'],startBlocked:['故障未解除，无法启动','Clear the fault before starting','異常を解除してから起動してください'],
    calibrationConfirm:['确认保存此校准设定？','Save this calibration value?','校正値を保存しますか？'],
    calibrated:['校准设定已保存','Calibration setting saved','校正値を保存しました'],alarmRestored:['异常已解除，可执行报警复位','Condition cleared. Alarm can now be reset.','異常解除済み・リセット可能'],
    runningNormal:['设备运行正常','System running normally','装置は正常運転中です'],
  };
  const iconPaths = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    settings:'<path d="m9 3-.6 3-2 .9L3.8 6l-2 3.5L4 11v2l-2.2 1.5 2 3.5 2.6-.9 2 .9L9 21h4l.6-3 2-.9 2.6.9 2-3.5L18 13v-2l2.2-1.5-2-3.5-2.6.9-2-.9L13 3z"/><circle cx="11" cy="12" r="3"/>',
    monitor:'<path d="M4 21V11h4v10M10 21V3h4v18M16 21V7h4v14M2 21h20"/>',
    alarm:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    warning:'<path d="m12 3 10 18H2zM12 9v5M12 17v.1"/>',
    check:'<path d="m5 12 4 4L19 6"/>',arrow:'<path d="m9 5 7 7-7 7"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18"/>',
    power:'<path d="M12 3v8M6.35 5.65a9 9 0 1 0 11.3 0"/>',
    start:'<path d="m8 4 12 8-12 8z"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="1"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',exit:'<path d="M10 4H4v16h6M10 12h11m-4-4 4 4-4 4"/>',
    pressure:'<path d="M4 19a9 9 0 1 1 16 0M12 13l4-5"/><circle cx="12" cy="13" r="2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    fan:'<circle cx="12" cy="12" r="2"/><path d="M11 10C2 0 21 0 14 10M14 12c12-3 4 14-1 2M11 14C8 26-4 11 10 11"/>',
    refresh:'<path d="M20 7a9 9 0 1 0 1 8M20 2v6h-6"/>',trash:'<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
    drop:'<path d="M12 2C9 7 5 10 5 15a7 7 0 0 0 14 0c0-5-4-8-7-13zM9 15a3 3 0 0 0 3 3"/>',
    vibration:'<path d="M2 12h3l3-8 4 16 4-12 3 4h3"/>',
  };
  // Tabler Icons (MIT); original SVGs, source revision and license are in assets/icons/.
  Object.assign(iconPaths,{
    motor:'<path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />  <path d="M5 12h-3" />  <path d="M19 12h3" />  <path d="M10 14v-4l2 2l2 -2v4" />',
    ammeter:'<path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />  <path d="M5 12h-3" />  <path d="M19 12h3" />  <path d="M10 14v-3c0 -1.036 .895 -2 2 -2s2 .964 2 2v3" />  <path d="M14 12h-4" />',
    voltmeter:'<path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />  <path d="M5 12h-3" />  <path d="M19 12h3" />  <path d="M10 10l2 4l2 -4" />',
    noise:'<path d="M15 8a5 5 0 0 1 0 8" />  <path d="M17.7 5a9 9 0 0 1 0 14" />  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />',
    airflow:'<path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />  <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />  <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />',
  });
  const icon=(name,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.monitor}</svg>`;
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
    {title:'homeDisplay',items:[['logo','brandLogo'],['version','versionLabel']]},
  ];
  const previewAppearance={frame:'baseline',pump:'flow'};
  let powerPress=null,suppressPowerClick=false;
  const state={version:initialVersion,lang:0,page:'home',factoryTab:'features',featurePage:0,running:true,transition:null,scenario:'warning',pumpRunning:true,pumpFault:false,linkage:'local',loggedIn:null,session:null,loginTimeoutMode:'absolute',modal:null,readingSample:'normal',monitorSample:'normal',
    features:{...Object.fromEntries(monitorFields.map(field=>[field.key,true])),fan:true,vfd:true,inlet:true,logo:true,dp1:true,dp2:true,dp3:true,dp4:true,pump:true,fireValve:true},
    monitorReadings:Object.fromEntries(monitorFields.map(field=>[field.key,field.sample])),
    readings:{inlet:800,frequency:42.5,dp1:320,dp2:560,dp3:1280,dp4:410},
    values:{userLoginMinutes:2,factoryLoginMinutes:2,dpRange:2000,dp1a:800,dp1b:1200,dp2a:1000,dp2b:1500,dp3a:1200,dp3b:1800,dp4a:800,dp4b:1200,startDelay:5,stopDelay:10,pressureTarget:800,interval:5,deviation:50,steady:30,kp:1.2,ti:10,kd:0,td:1},
    calibrations:{},alarms:[],alarmSeq:0,runStartedAt:performance.now(),runElapsedMs:0,accumulatedRunMs:0,totalBaseMs:0};
  const t=key=>words[key]?.[state.lang]??key;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function timeParts(date=new Date()) { return {date:new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(date),time:new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(date)}; }
  let sessionTimer;
  function sessionDeadline(){const session=state.session;return session?(session.mode==='idle'?session.lastActivityAt:session.startedAt)+session.durationMs:null;}
  function ensureSession(){
    if(state.session&&performance.now()>=sessionDeadline()){endSession(true);return false;}
    return true;
  }
  function scheduleSession(){
    clearTimeout(sessionTimer);
    if(state.session)sessionTimer=setTimeout(()=>{if(ensureSession())scheduleSession();},Math.max(1,Math.ceil(sessionDeadline()-performance.now())));
  }
  function establishSession(role){
    const now=performance.now();state.loggedIn=role;
    state.session={startedAt:now,lastActivityAt:now,mode:state.loginTimeoutMode,durationMs:state.values[role==='user'?'userLoginMinutes':'factoryLoginMinutes']*60000};
    scheduleSession();
  }
  function endSession(expired=false){
    clearTimeout(sessionTimer);state.loggedIn=null;state.session=null;state.modal=null;
    if(['user','factory'].includes(state.page))state.page='settings';
    render();document.querySelector('.user-button').focus();if(expired)toast('sessionExpired');
  }
  function observeActivity(event){
    if(!event.target.closest?.('#hmi'))return true;
    if(!ensureSession())return false;
    if(state.session?.mode==='idle'){state.session.lastActivityAt=performance.now();scheduleSession();}
    return true;
  }
  function canAccess(role,account=state.loggedIn){
    return ['user','factory'].includes(role)&&(account===role||account==='factory');
  }
  function requireRole(role){
    if(!ensureSession())return false;
    if(canAccess(role))return true;
    state.modal=null;state.page='settings';render();toast('signInRequired');return false;
  }
  function parameterRole(key){return /^dp[1-4][ab]$/.test(key)||['startDelay','stopDelay','pressureTarget'].includes(key)?'user':'factory';}
  function addAlarm(kind,details={}){const p=timeParts();state.alarms.unshift({id:++state.alarmSeq,kind,...p,condition:true,...details});}
  const activeCount=()=>state.alarms.length;
  const faultLatched=()=>state.alarms.some(x=>x.kind==='fault');
  function readingState(key){
    const enabled=state.features.vfd&&(key!=='inlet'||state.features.inlet),valid=Number.isFinite(state.readings[key]);
    const status=!enabled?'disabled':!valid?'unavailable':state.running?'running':'stopped';
    return {status,value:enabled&&valid?(state.running?state.readings[key]:0):null};
  }
  function pressureReading(key){return key==='inlet'?readingState(key).value:state.running?state.readings[key]:0;}
  function pressureState(index){
    const key='dp'+index,value=pressureReading(key),first=state.values[key+'a'],second=state.values[key+'b'];
    // Display-only demo boundaries. Equipment interlocks remain independent.
    const level=value>second?'maintenance':value>first?'warning':'normal';
    return {key,value,first,second,level,enabled:state.features[key],range:state.values.dpRange};
  }
  function syncAlarms(){
    state.alarms.forEach(row=>row.condition=false);
    if(state.scenario==='fault'){
      const fault=state.alarms.find(row=>row.kind==='fault');
      if(fault)fault.condition=true;else addAlarm('fault');
    }
    [1,2,3,4].map(pressureState).filter(point=>point.enabled&&point.level!=='normal').forEach(point=>{
      const details={source:point.key,value:point.value,level:point.level,condition:true};
      const row=state.alarms.find(row=>row.kind==='dp'&&row.source===point.key);
      if(row)Object.assign(row,details);else addAlarm('dp',details);
    });
  }
  function alarmSource(row){return row.kind==='dp'?row.source:row.kind==='fault'?'fan':'inlet';}
  function alarmDescription(row){return row.kind==='dp'?t(row.level==='maintenance'?'replaceFilter':'prepareFilter'):t(row.kind==='fault'?'fanFault':'highInlet');}
  function machineLabel(){return state.transition?t(state.transition):state.scenario==='fault'||faultLatched()?t('fault'):t(state.running?'running':'stopped');}
  function statusClass(){return state.scenario==='fault'||faultLatched()?'fault':state.running?'':'stopped';}
  let runtimeTimer;
  function runtimeSeconds(){return Math.floor((state.running?Math.max(0,performance.now()-state.runStartedAt):state.runElapsedMs)/1000);}
  function totalRuntimeSeconds(){return Math.floor((state.totalBaseMs+state.accumulatedRunMs+(state.running?Math.max(0,performance.now()-state.runStartedAt):0))/1000);}
  function formatRuntime(seconds){return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(value=>String(value).padStart(2,'0')).join(':');}
  function updateRuntime(){
    clearTimeout(runtimeTimer);
    const clock=$('run-time'),total=$('total-run-time');if(!clock&&!total)return;
    if(clock){const seconds=runtimeSeconds();clock.textContent=formatRuntime(seconds);clock.setAttribute('datetime',`PT${seconds}S`);}
    if(total){const seconds=totalRuntimeSeconds();total.textContent=formatRuntime(seconds);total.setAttribute('datetime',`PT${seconds}S`);$('total-run-hours').textContent=Math.floor(seconds/3600).toLocaleString('en-US');}
    if(state.running){
      const elapsed=Math.max(0,performance.now()-state.runStartedAt),totalElapsed=state.totalBaseMs+state.accumulatedRunMs+elapsed;
      runtimeTimer=setTimeout(updateRuntime,Math.max(1,Math.ceil(Math.min(1000-elapsed%1000,1000-totalElapsed%1000))));
    }
  }
  function setRunning(run){
    if(state.running===run)return;
    if(run){state.runStartedAt=performance.now();state.runElapsedMs=0;}
    else{state.runElapsedMs=Math.max(0,performance.now()-state.runStartedAt);state.accumulatedRunMs+=state.runElapsedMs;state.runStartedAt=null;}
    state.running=run;
  }
  function pumpState(){return !state.features.pump?'disabled':state.pumpFault?'fault':state.pumpRunning?'running':'stopped';}
  function renderHeader(){
    const p=timeParts(),accountLabel=state.loggedIn?`${t('signedIn')}：${t(state.loggedIn==='user'?'userRole':'factoryRole')}`:t('signedOut');
    $('hmi-header').innerHTML=`<div class="header-brand">${state.features.logo?'<img class="logo" src="assets/rainbow-logo.svg" alt="RAINBOW">':''}</div><div class="header-alarm-slot"><button class="header-alarm-banner" id="alarm-banner" data-page="alarms" hidden></button></div><div class="header-right"><button class="language-button icon-button" data-action="language" aria-label="${t('language')}" title="${t('language')}">${icon('globe',20)}</button><button class="icon-button user-button ${state.loggedIn?'signed-in':''}" data-action="user-access" aria-label="${accountLabel}" title="${accountLabel}" aria-haspopup="${state.loggedIn?'menu':'dialog'}">${icon('user',20)}</button><div class="clock" id="clock"><time id="clock-time" datetime="${p.date}T${p.time}+08:00">${p.time.slice(0,5)}</time><time class="clock-date" id="clock-date" datetime="${p.date}">${p.date.replaceAll('-','/')}</time></div></div>`;
  }
  function renderAlarm(){
    const n=activeCount(),rows=state.alarms.filter(row=>row.condition);
    const current=rows.find(row=>row.kind==='fault')||rows.find(row=>row.level==='maintenance')||rows[0];
    const restored=n>0&&!current,severe=current?.kind==='fault'||current?.level==='maintenance';
    const summary=restored?t('restoredSummary'):current?current.kind==='fault'?t('faultSummary'):`${t(alarmSource(current))} · ${alarmDescription(current)}`:t('noAlarm');
    const banner=$('alarm-banner');banner.hidden=!n;
    banner.className=`header-alarm-banner ${severe?'fault':'warning'}`;
    banner.title=summary;banner.setAttribute('aria-label',`${summary} ${t('details')}`);
    banner.innerHTML=`<span class="header-alarm-symbol">${icon(restored?'check':'warning',20)}</span><span class="header-alarm-message">${summary}</span><span class="header-alarm-link" aria-hidden="true">${icon('arrow',16)}</span>`;
  }
  function renderNav(){
    const active=['user','factory'].includes(state.page)?'settings':state.page;
    $('side-nav').innerHTML=['home','alarms','monitor','settings'].map(key=>`<button class="nav-button ${active===key?'active':''}" data-page="${key}" aria-current="${active===key?'page':'false'}">${icon(key==='alarms'?'alarm':key,21)}<span>${t(key)}</span>${key==='alarms'&&activeCount()?`<span class="nav-badge">${activeCount()}</span>`:''}</button>`).join('')+`<div class="nav-version" aria-label="${t('systemVersion')} ${esc(state.version)}">${esc(state.version)}</div>`;
  }
  const numberButton=(key,value,unit='',name=key,max=3000,min=0)=>`<button class="number-button" data-edit="${key}" data-title="${esc(name)}" data-unit="${unit}" data-max="${max}" data-min="${min}" aria-label="${esc(name)}: ${value} ${unit}"><span>${value}</span><small>${unit}</small></button>`;
  const segments=(key,options,current)=>`<div class="segmented">${options.map(([v,label])=>`<button data-segment="${key}" data-value="${v}" class="${String(current)===String(v)?'active':''}" aria-pressed="${String(current)===String(v)}">${t(label)}</button>`).join('')}</div>`;
  function gauge(index){
    const point=pressureState(index),{value,range}=point;
    const fault=state.scenario==='fault'||faultLatched();
    const level=fault?'fault':point.level,warning=level==='warning',red=level==='maintenance'||level==='fault';
    const ratio=Math.max(0,Math.min(1,value/range));
    const path='M 19 85 A 47 47 0 1 1 101 85';
    return `<div class="gauge-card card ${warning?'warning':red?'fault':''}" data-channel="${point.key}" data-pressure-state="${level}"><div class="gauge-title">${t(point.key)}</div><div class="gauge-dial"><svg class="gauge-svg" viewBox="0 0 120 105" aria-hidden="true"><path class="gauge-track" d="${path}" pathLength="100"/><path class="gauge-value-path" d="${path}" pathLength="100" stroke-dasharray="${ratio*100} 100" stroke-opacity="${ratio?1:0}"/><text class="gauge-scale" x="10" y="101">0</text><text class="gauge-scale" x="110" y="101" text-anchor="end">${range}</text><path d="M60 13v5M26 29l4 4M13 59h5M94 29l-4 4M107 59h-5" stroke="#c7d5e4" stroke-width="1"/></svg><div class="gauge-number">${value.toLocaleString('en-US')}<small>Pa</small></div></div><div class="gauge-footer"><span class="gauge-status" aria-hidden="true"></span><span>${t(level==='fault'?'filterFault':level==='maintenance'?'filterMaintenance':warning?'filterWarning':'filterNormal')}</span></div></div>`;
  }
  function pumpGraphic(){
    const machine=`<g class="pump-machine">
          <rect class="pump-shell" x="64" y="30" width="16" height="22" rx="3"/>
          <path d="M68 38v9M76 38v9"/>
          <rect class="pump-shell" x="66" y="23" width="12" height="9" rx="2"/>
          <rect class="pump-shell" x="60" y="4" width="24" height="20" rx="4"/>
          <path d="M64 10h16M65 14v6M70 14v6M75 14v6M80 14v6M60 24h24"/>
          <path d="M62 32h20"/>
        </g>`;
    if(previewAppearance.pump==='compact')return `<svg class="pump-graphic pump-compact-graphic" viewBox="56 0 32 56" role="img" aria-label="${t('pump')}"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${machine}</g></svg><div class="pump-compact-feedback"><strong>${t(pumpState()==='disabled'?'notEnabled':pumpState()==='running'?'pumpOn':pumpState()==='fault'?'pumpFault':'pumpOff')}</strong><span>${t('pumpFeedback')}</span></div>`;
    const pipe='M80 36h28a4 4 0 0 0 4-4v-8a4 4 0 0 1 4-4h84a4 4 0 0 1 4 4v12';
    return `<svg class="pump-graphic" viewBox="0 0 240 60" role="img" aria-label="${t('pumpFlowDescription')}">
      <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path class="pump-vessel" d="M4 34v18a4 4 0 0 0 4 4h88a4 4 0 0 0 4-4V34"/>
        <path class="pump-oil-fill" d="M6 46h92v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/>
        <path class="pump-oil-surface" d="M8 46c8-2 12 2 20 0s12 2 20 0h48"/>
        <g class="pump-motion"><path class="pump-source-drop" d="M24 26c-1 2-3 4-3 5a3 3 0 0 0 6 0c0-1-2-3-3-5z"/>
        <path class="pump-source-drop pump-source-drop-second" d="M44 26c-1 2-3 4-3 5a3 3 0 0 0 6 0c0-1-2-3-3-5z"/>
        </g>
        ${machine}
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
  function runtimePanel(){
    const seconds=runtimeSeconds();
    return `<div class="session-runtime" role="group" aria-labelledby="run-time-label"><span id="run-time-label">${t('sessionRuntime')}</span><time id="run-time" datetime="PT${seconds}S">${formatRuntime(seconds)}</time></div>`;
  }
  function linearChart(value,max,step,kind){
    // Match the 212 px content width; the 4 px round caps meet its outer edges.
    const width=212,inset=4,span=width-inset*2;
    const ratio=Number.isFinite(value)?Math.max(0,Math.min(1,value/max)):0,end=inset+ratio*span;
    const marks=Array.from({length:Math.round(max/step)+1},(_,i)=>i*step),position=mark=>inset+mark/max*span;
    return `<svg class="${kind}-chart" viewBox="0 0 ${width} 32" aria-hidden="true"><path class="linear-track" d="M${inset} 8H${width-inset}"/><path class="linear-value" d="M${inset} 8H${end}" stroke-opacity="${ratio?1:0}"/><path class="linear-ticks" d="${marks.map(mark=>`M${position(mark)} 4v8`).join('')}"/><g class="chart-scale">${marks.map((mark,i)=>`<text x="${i===0?0:i===marks.length-1?width:position(mark)}" y="31" text-anchor="${i===0?'start':i===marks.length-1?'end':'middle'}">${mark}</text>`).join('')}</g></svg>`;
  }
  function pressureChart(pressure){return linearChart(pressure,3000,750,'pressure');}
  function frequencyChart(frequency){return linearChart(frequency,60,10,'frequency');}
  function readingCard(key){
    const point=readingState(key),pressure=key==='inlet',label=pressure?'inlet':'frequency';
    const status=point.status==='disabled'?'notEnabled':point.status==='unavailable'?'noData':null;
    const value=point.value===null?'—':pressure?String(point.value):point.value.toFixed(1);
    return `<section class="reading-card ${pressure?'pressure':'frequency'}-card card ${status?'is-'+point.status:''}" data-reading-status="${point.status}" aria-label="${t(label)}${status?' · '+t(status):''}"><div class="reading-title">${icon(pressure?'pressure':'motor',16)}<span>${t(label)}</span>${status?`<span class="reading-state-label">${t(status)}</span>`:''}</div><div class="reading-body metric-body"><div class="reading-value"><span ${pressure?'data-inlet-reading':'data-frequency-reading'}>${value}</span><small>${pressure?'Pa':'Hz'}</small></div>${pressure?pressureChart(point.value):frequencyChart(point.value)}</div></section>`;
  }
  function powerButtons(){
    const fault=state.scenario==='fault'||faultLatched();
    const startDisabled=Boolean(state.running||state.transition||fault||state.linkage==='remote');
    const stopDisabled=Boolean(!state.running||state.transition);
    const startHint=state.transition?'powerBusyHelp':fault?'powerResetFirst':state.linkage==='remote'?'powerRemote':'powerStartHelp';
    return `<div class="control-buttons" role="group" aria-label="${t('powerControl')}" aria-busy="${Boolean(state.transition)}"><button type="button" class="power-button start-button" data-action="start" title="${t(startHint)}" ${startDisabled?'disabled':''}>${icon('start',24)}<span>${t('start')}</span></button><button type="button" class="power-button stop-button" data-action="stop" title="${t(state.transition?'powerBusyHelp':'powerStopHelp')}" ${stopDisabled?'disabled':''}>${icon('stop',24)}<span>${t('stop')}</span></button></div>`;
  }
  function home(){
    const pump=pumpState(),pumpLabel=t(pump==='disabled'?'notEnabled':pump==='running'?'pumpOn':pump==='fault'?'pumpFault':'pumpOff');
    const pressureChannels=[1,2,3,4].filter(i=>state.features['dp'+i]);
    const operationState=state.transition||(state.scenario==='fault'?'fault':faultLatched()&&!state.running?'resetRequired':faultLatched()?'fault':state.running?'running':'stopped');
    return `<div class="home-layout">
      <div class="home-metrics">
        ${readingCard('inlet')}${readingCard('frequency')}
      </div>
      <section class="pump-card card ${pump}" data-pump-status="${pump}" aria-label="${t('pump')} · ${pumpLabel}"><div class="pump-summary"><div class="pump-title">${icon('drop',16)}<span>${t('pump')}</span></div><div class="pump-state"><span class="pump-status" aria-hidden="true"></span><span>${pumpLabel}</span></div></div><div class="pump-body ${previewAppearance.pump==='compact'?'pump-compact':''}">${pumpGraphic()}</div></section>
      <div class="gauge-grid" data-count="${pressureChannels.length}" style="--gauge-count:${Math.max(1,pressureChannels.length)}" role="group" aria-label="${t('pressureChannels')}">${pressureChannels.length?pressureChannels.map(gauge).join(''):`<div class="gauge-empty card">${t('noPressureChannels')}</div>`}</div>
      <aside class="control-panel card" aria-label="${t('equipment')}"><div class="operation-tabs" role="group" aria-label="${t('operationMode')}">${['local','remote'].map(source=>`<button class="operation-tab" data-action="mode-settings-hint" aria-current="${state.linkage===source}" title="${t('modeSettingsHint')}">${t(source)}</button>`).join('')}</div><div class="control-info"><div class="control-status-row"><span class="control-status-label">${t('runningStatus')}</span><span class="control-status-value" data-status="${operationState}" role="status"><span class="control-status-dot" aria-hidden="true"></span>${t(operationState)}</span></div>${runtimePanel()}</div>${powerButtons()}</aside>
    </div>`;
  }
  function heading(title,sub='',exit=false){return `<div class="page-heading${exit?' parameter-heading':''}"><h2>${t(title)}</h2>${exit?`<button class="subtle-button parameter-back" data-page="settings">${icon('arrow',18)}${t('back')}</button>`:`<span class="heading-sub">${t(sub)}</span>`}</div>`;}
  function settings(){return heading('settingsTitle','accessHint')+`<div class="settings-gateway">${[['user','user','userDescription'],['factory','manufacturer','factoryDescription']].map(([role,key,description],i)=>`<button type="button" class="access-card card ${role}" data-login="${role}" aria-labelledby="access-title-${role}" aria-describedby="access-description-${role}"><span class="access-number" aria-hidden="true">0${i+1}</span><span class="access-icon">${icon(role==='user'?'user':'settings',26)}</span><span class="access-title" id="access-title-${role}">${t(key)}</span><span class="access-description" id="access-description-${role}">${t(description)}</span><span class="access-button" aria-hidden="true"><span>${icon(canAccess(role)?'arrow':'lock',13)} ${t(canAccess(role)?'enterSettings':'login')}</span>${icon('arrow',15)}</span></button>`).join('')}</div>`;}
  function user(){
    return heading('user','',true)+`<div class="user-parameters"><div class="user-grid">
      <section class="card threshold-card" aria-labelledby="threshold-title"><h3 class="panel-title" id="threshold-title">${t('threshold')}</h3><div class="threshold-table" role="table" aria-labelledby="threshold-title" aria-describedby="threshold-origin"><div class="threshold-header" role="row"><span role="columnheader">${t('stageLabel')}</span><span role="columnheader">① ${t('set1')}</span><span role="columnheader">② ${t('set2')}</span></div>${[1,2,3,4].map(i=>`<div class="threshold-row" role="row" data-threshold-channel="dp${i}"><span role="rowheader">${t('dp'+i)}</span><div role="cell">${numberButton('dp'+i+'a',state.values['dp'+i+'a'],'Pa',t('dp'+i)+' · ① '+t('set1'),65535)}</div><div role="cell">${numberButton('dp'+i+'b',state.values['dp'+i+'b'],'Pa',t('dp'+i)+' · ② '+t('set2'),65535)}</div></div>`).join('')}</div></section>
      <section class="card user-control-card" aria-labelledby="user-control-title"><h3 class="panel-title" id="user-control-title">${t('controlSettings')}</h3><div class="user-control-fields"><div class="field-row"><span>${t('linkage')}</span>${segments('linkage',[['local','local'],['remote','remote']],state.linkage)}</div>${[['startDelay','s',999],['stopDelay','s',999],['pressureTarget','Pa',3000]].map(([key,unit,max])=>`<div class="field-row"><span>${t(key)}</span>${numberButton(key,state.values[key],unit,t(key),max)}</div>`).join('')}</div></section>
      </div><div class="user-parameter-notes"><span id="threshold-origin">${t('zeroOrigin')}</span><div class="threshold-legend">${[['normal','filterNormal','0 ≤ ΔP ≤ ①'],['warning','filterWarning','① < ΔP ≤ ②'],['maintenance','filterMaintenance','ΔP > ②']].map(([state,label,range])=>`<div class="threshold-band ${state}"><span class="threshold-band-label"><i aria-hidden="true"></i>${t(label)}</span><span class="threshold-band-range">${range}</span></div>`).join('')}</div></div></div>`;
  }
  function factoryFeatures(){
    const page=featurePages[state.featurePage];
    return `<div class="feature-content" role="group" aria-label="${t(page.title)}"><div class="feature-grid">${page.items.map(([key,label])=>`<div class="feature-row"><span>${t(label)}</span>${key==='version'?`<button class="number-button version-button" data-action="edit-version" aria-label="${t('versionLabel')} ${esc(state.version)}">${esc(state.version)}</button>`:segments('feature:'+key,[['true','enable'],['false','disable']],state.features[key])}</div>`).join('')}</div></div><div class="feature-paging" role="group" aria-label="${t('features')}"><button class="button feature-page-button previous" data-feature-page="${state.featurePage-1}" ${state.featurePage===0?'disabled':''}>${icon('arrow',18)}${t('previous')}</button><div class="feature-page-label" id="feature-page-label" tabindex="-1" aria-live="polite"><strong>${state.featurePage+1} / ${featurePages.length}</strong></div><button class="button feature-page-button" data-feature-page="${state.featurePage+1}" ${state.featurePage===featurePages.length-1?'disabled':''}>${t('next')}${icon('arrow',18)}</button></div>`;
  }
  function sessionSettings(){
    return `<div class="session-settings"><div class="field-row"><span>${t('userLoginMinutes')}</span>${numberButton('userLoginMinutes',state.values.userLoginMinutes,'min',t('userLoginMinutes'),60,1)}</div><div class="field-row"><span>${t('factoryLoginMinutes')}</span>${numberButton('factoryLoginMinutes',state.values.factoryLoginMinutes,'min',t('factoryLoginMinutes'),60,1)}</div><div class="field-row session-mode-row"><span>${t('loginTimeoutMode')}</span>${segments('loginTimeoutMode',[['absolute','absoluteTimeout'],['idle','idleTimeout']],state.loginTimeoutMode)}</div></div>`;
  }
  function factory(){
    let content='';
    if(state.factoryTab==='features') content=factoryFeatures();
    if(state.factoryTab==='tuning') content=`<div class="tuning-grid">${[['interval','s'],['kp',''],['deviation','Pa'],['ti',''],['steady','s'],['kd',''],['dpRange','Pa',65535,1],['td','']].map(([key,unit,max=3000,min=0])=>`<div class="field-row"><span>${words[key]?t(key):key.toUpperCase()}</span>${numberButton(key,state.values[key],unit,words[key]?t(key):key.toUpperCase(),max,min)}</div>`).join('')}</div>`;
    if(state.factoryTab==='calibration') content=`<table class="calibration-table"><thead><tr><th>${t('point')}</th><th>${t('current')}</th><th>${t('zero')}</th><th>${t('span')}</th></tr></thead><tbody>${['inlet','dp1','dp2','dp3','dp4'].map(key=>`<tr><td>${t(key)}</td><td class="calibration-value">${pressureReading(key)??'—'} <small>Pa</small></td><td>${numberButton('cal:'+key+':zero',state.calibrations[key+':zero']??0,'',t(key)+' · '+t('zero'),65535)}</td><td>${numberButton('cal:'+key+':span',state.calibrations[key+':span']??3000,'',t(key)+' · '+t('span'),65535)}</td></tr>`).join('')}</tbody></table>`;
    if(state.factoryTab==='sessionSettings')content=sessionSettings();
    return `<div class="page-heading factory-heading"><h2 id="factory-title">${t('manufacturer')}</h2><button class="subtle-button parameter-back" data-page="settings">${icon('arrow',18)}${t('back')}</button></div><div class="factory-layout card"><div class="factory-tabs" role="tablist" aria-orientation="vertical" aria-labelledby="factory-title">${['features','tuning','calibration','sessionSettings'].map(key=>`<button id="factory-tab-${key}" role="tab" aria-selected="${state.factoryTab===key}" aria-controls="factory-panel" tabindex="${state.factoryTab===key?0:-1}" data-factory-tab="${key}" class="${state.factoryTab===key?'active':''}">${t(key)}</button>`).join('')}</div><div id="factory-panel" role="tabpanel" aria-labelledby="factory-tab-${state.factoryTab}" class="factory-panel ${state.factoryTab}">${content}</div></div>`;
  }
  function monitor(){
    const cards=Object.fromEntries(monitorFields.map(field=>{
      const raw=state.monitorReadings[field.key],status=!state.features[field.key]?'disabled':!Number.isFinite(raw)?'unavailable':'valid';
      const value=status==='valid'?raw.toLocaleString('en-US',{minimumFractionDigits:field.digits,maximumFractionDigits:field.digits}):'—';
      return [field.key,`<section class="monitor-card card" data-monitor-key="${field.key}" data-monitor-status="${status}" aria-label="${t(field.key)}"><div class="monitor-label">${icon(field.icon,15)}<span>${t(field.key)}</span>${status==='disabled'?`<span class="monitor-state-label">${t('notEnabled')}</span>`:''}</div><div class="monitor-value"><span>${value}</span><small>${field.unit}</small></div><div class="monitor-hint">${status==='unavailable'?t('noData'):''}</div></section>`];
    }));
    const fanEnabled=state.features.fan,total=totalRuntimeSeconds();
    cards.fan=`<section class="monitor-card monitor-fan card" data-monitor-key="fan" data-monitor-status="${fanEnabled?'valid':'disabled'}" aria-label="${t('filtrationStatus')}"><div class="monitor-label">${icon('fan',15)}<span>${t('filtrationStatus')}</span>${!fanEnabled?`<span class="monitor-state-label">${t('notEnabled')}</span>`:''}</div><div class="monitor-value ${fanEnabled?statusClass():''}"><span>${fanEnabled?machineLabel():'—'}</span></div><div class="monitor-hint">${fanEnabled?`${t(state.features.vfd?'vfd':'fixed')} · ${t(state.linkage)}`:''}</div></section>`;
    cards.totalRuntime=`<section class="monitor-card monitor-runtime card" data-monitor-key="totalRuntime" aria-label="${t('totalRuntime')}"><div class="monitor-label">${icon('clock',15)}<span>${t('totalRuntime')}</span></div><div class="monitor-value"><span id="total-run-hours">${Math.floor(total/3600).toLocaleString('en-US')}</span><small>h</small></div><time class="monitor-hint" id="total-run-time" datetime="PT${total}S">${formatRuntime(total)}</time></section>`;
    const order=['fan','currentAmp','vibration','inletConcentration','voltage','noise','concentration','airflow','totalRuntime'];
    return heading('monitorTitle','readonly')+`<div class="monitor-grid">${order.map(key=>cards[key]).join('')}</div>`;
  }
  function alarms(){
    return `<div class="page-heading"><h2>${t('alarmTitle')}</h2><span class="alarm-summary">${t('pendingAlarms')} <b>${activeCount()}</b></span></div><div class="alarm-table-wrap card">${state.alarms.length?`<table class="alarm-table"><thead><tr>${['date','time','description','status'].map(k=>`<th scope="col">${t(k)}</th>`).join('')}</tr></thead><tbody>${state.alarms.map(row=>`<tr class="${!row.condition?'pending-row':row.kind==='fault'||row.level==='maintenance'?'fault-row':'active-row'}"><td>${row.date}</td><td>${row.time}</td><td class="alarm-description">${row.kind==='dp'?`${t(alarmSource(row))} · `:''}${alarmDescription(row)}</td><td><span class="alarm-tag ${!row.condition?'pending':row.kind==='fault'||row.level==='maintenance'?'fault':''}">${t(row.condition?'active':'resetRequired')}</span></td></tr>`).join('')}</tbody></table>`:`<div class="empty-state">${icon('check',28)}${t('empty')}</div>`}</div><div class="alarm-actions"><button class="button primary" data-action="reset-alarm">${icon('refresh',18)}${t('resetAlarm')}</button></div>`;
  }
  function render(){$('preview-version').textContent='交互原型 '+state.version;cancelPowerPress(true);if(!ensureSession())return;$('hmi').dataset.frame=previewAppearance.frame;syncAlarms();if(['user','factory'].includes(state.page)&&!canAccess(state.page))state.page='settings';renderHeader();renderAlarm();renderNav();document.querySelectorAll('[data-pump-state]').forEach(button=>{button.classList.toggle('selected',button.dataset.pumpState===pumpState());button.disabled=!state.features.pump;});document.querySelectorAll('[data-reading-sample]').forEach(button=>button.classList.toggle('selected',button.dataset.readingSample===state.readingSample));document.querySelectorAll('[data-monitor-sample]').forEach(button=>button.classList.toggle('selected',button.dataset.monitorSample===state.monitorSample));const content=$('page-content');content.className=`page-content ${state.page==='home'?'home-page':state.page==='alarms'?'alarms-page':''}`;content.innerHTML=({home,settings,user,factory,monitor,alarms}[state.page]||home)();updateRuntime();renderModal();if(toastKey&&!$('toast').hidden)$('toast').textContent=t(toastKey);}
  let toastTimer,toastKey;
  function toast(key){toastKey=key;clearTimeout(toastTimer);$('toast').textContent=t(key);$('toast').hidden=false;toastTimer=setTimeout(()=>{$('toast').hidden=true;toastKey=null;},2600);}
  function openModal(modal){if(controller&&!controller.hidden)setControllerOpen(false);state.modal=modal;renderModal();}
  function closeModal(restoreFocus=true){const selector=state.modal?.type==='version'?'[data-action="edit-version"]':state.modal?.type==='language'?'.language-button':state.modal?.type==='account'||state.modal?.returnToUserButton?'.user-button':null;state.modal=null;renderModal();if(restoreFocus&&selector)document.querySelector(selector)?.focus();}
  function positionHeaderMenu(id,button){const screen=$('hmi').getBoundingClientRect(),anchor=button.getBoundingClientRect(),scale=screen.width/800;$(id).style.left=Math.max(8,Math.min(800-176-8,(anchor.right-screen.left)/scale-176))+'px';$(id).style.top=(anchor.bottom-screen.top)/scale+8+'px';}
  function modalShell(title,body,cls='',footer=''){return `<div class="overlay"><section class="modal ${cls}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><h2>${title}</h2><button class="close-button" data-action="close-modal" aria-label="${t('cancel')}">${icon('close',20)}</button></div>${body}${footer}</section></div>`;}
  function numberInputInfo(modal){
    let info=`${t('range')}：${modal.min??0} – ${modal.max} ${modal.unit}`;
    if(/^dp[1-4][ab]$/.test(modal.key)){
      const first=modal.key.endsWith('a'),other=modal.key.slice(0,-1)+(first?'b':'a');
      info+=`<br>${t(first?'thresholdBelow':'thresholdAbove')} (${state.values[other]} Pa)`;
    }else info+=`<br>${t('editHint')}`;
    return info;
  }
  function renderModal(){
    const modal=state.modal,languageButton=document.querySelector('.language-button');
    languageButton.setAttribute('aria-haspopup','menu');languageButton.setAttribute('aria-controls','language-menu');languageButton.setAttribute('aria-expanded',String(modal?.type==='language'));
    const userButton=document.querySelector('.user-button');
    if(state.loggedIn){userButton.setAttribute('aria-controls','account-menu');userButton.setAttribute('aria-expanded',String(modal?.type==='account'));}
    if(!modal){$('modal-root').innerHTML='';return;}
    if(modal.type==='account'){
      $('modal-root').innerHTML=`<div class="account-dropdown" id="account-menu" role="menu" aria-label="${t('userAccess')}" aria-describedby="account-identity"><div class="account-identity" id="account-identity"><span>${t('currentAccount')}</span><strong>${t(state.loggedIn==='user'?'userRole':'factoryRole')}</strong></div><button class="account-option" role="menuitem" tabindex="-1" data-action="switch-account">${t('switchAccount')}</button><button class="account-option" role="menuitem" tabindex="-1" data-action="logout">${t('signOut')}</button></div>`;
      positionHeaderMenu('account-menu',userButton);document.querySelector('.account-option').focus();return;
    }
    if(modal.type==='language'){
      $('modal-root').innerHTML=`<div class="language-dropdown" id="language-menu" role="menu" aria-label="${t('language')}">${['中文','English','日本語'].map((label,i)=>`<button class="language-option ${state.lang===i?'selected':''}" data-language="${i}" role="menuitemradio" aria-checked="${state.lang===i}" tabindex="-1"><span>${label}</span>${state.lang===i?icon('check',16):''}</button>`).join('')}</div>`;
      positionHeaderMenu('language-menu',languageButton);
      document.querySelector('.language-option.selected').focus();return;
    }
    if(modal.type==='confirm'){$('modal-root').innerHTML=modalShell(t(modal.title),`<div class="confirm-body"><p>${t(modal.message)}</p></div>`,'confirm-modal',`<div class="modal-actions"><button class="button" data-action="close-modal">${t('cancel')}</button><button class="button ${modal.danger?'danger':'primary'}" data-action="confirm-modal">${t('confirm')}</button></div>`);return;}
    const login=modal.type==='login',version=modal.type==='version';
    const title=login?(modal.switching?t('switchAccount'):modal.role?t(modal.role==='user'?'user':'manufacturer')+' · '+t('login'):t('login')):version?t('versionLabel'):modal.title;
    $('modal-root').innerHTML=modalShell(esc(title),`<div class="keypad-body"><div><p class="input-label">${t(login?'enterPassword':'enterValue')}${!login&&modal.unit?' / '+modal.unit:''}</p>${version?'<div class="version-input-wrap"><span class="version-prefix" aria-hidden="true">V</span>':''}<input id="keypad-input" class="keypad-input" type="${login?'password':'text'}" inputmode="${version?'none':login?'numeric':'decimal'}" ${version?'readonly aria-describedby="keypad-info keypad-error"':''} autocomplete="off" aria-label="${t(login?'enterPassword':'enterValue')}" maxlength="${version?11:12}" value="${esc(modal.value??'')}">${version?'</div>':''}<div class="keypad-error" id="keypad-error">${modal.error?t(modal.error):''}</div><div class="keypad-info" id="keypad-info">${version?t('versionHint'):login?t(modal.role?'passwordHint':'accountPasswordHint'):numberInputInfo(modal)}</div></div><div class="keypad">${['1','2','3','4','5','6','7','8','9','.', '0','backspace'].map(key=>`<button data-key="${key}" class="${key==='backspace'?'key-tool':''}">${key==='backspace'?'⌫':key}</button>`).join('')}</div></div>`, '',`<div class="modal-actions"><button class="button" data-action="clear-input">${t('clear')}</button><button class="button" data-action="close-modal">${t('cancel')}</button><button class="button primary" data-action="submit-input">${t(login?'login':'confirm')}</button></div>`);
    const input=$('keypad-input');input.addEventListener('input',()=>{modal.value=input.value;modal.fresh=false;});input.focus();input.select();
  }
  function submitInput(){
    const m=state.modal;if(!m||!['login','number','version'].includes(m.type)||!ensureSession())return;
    if(m.type==='version'){
      if(!requireRole('factory'))return;
      const value=$('keypad-input').value.trim();
      if(value.length>11||!/^\d+(?:\.\d+)*$/.test(value)){m.error='versionError';m.value=$('keypad-input').value;renderModal();return;}
      state.version='V'+value;closeModal(false);render();document.querySelector('[data-action="edit-version"]')?.focus();toast('saved');return;
    }
    if(m.type==='number'&&!requireRole(parameterRole(m.key)))return;
    const value=$('keypad-input').value;
    if(m.type==='login'){
      const role=value==='1234'?'user':value==='8888'?'factory':null;
      if(!role||(m.role&&!canAccess(m.role,role))){m.error='passwordError';m.value='';renderModal();return;}
      establishSession(role);if(m.role)state.page=m.role;
      closeModal(false);render();if(!m.role)document.querySelector('.user-button').focus();toast('loginSuccess');return;
    }
    const number=Number(value);
    if(!value.trim()||!Number.isFinite(number)||number<(m.min??0)||number>m.max){m.error='valueError';m.value=value;renderModal();return;}
    if(/^dp[1-4][ab]$/.test(m.key)){
      const first=m.key.endsWith('a')?number:state.values[m.key.slice(0,-1)+'a'];
      const second=m.key.endsWith('b')?number:state.values[m.key.slice(0,-1)+'b'];
      if(first>=second){m.error='thresholdOrderError';m.value=value;renderModal();return;}
    }
    if(['userLoginMinutes','factoryLoginMinutes'].includes(m.key)&&!Number.isInteger(number)){m.error='wholeMinutes';m.value=value;renderModal();return;}
    const save=()=>{if(!requireRole(parameterRole(m.key)))return;if(m.key.startsWith('cal:'))state.calibrations[m.key.slice(4)]=number;else state.values[m.key]=number;closeModal();render();toast(m.key.startsWith('cal:')?'calibrated':'saved');};
    if(m.key.startsWith('cal:'))openModal({type:'confirm',title:'calibration',message:'calibrationConfirm',onConfirm:save});else save();
  }
  function setScenario(kind){
    state.scenario=kind;state.readings.dp3=kind==='warning'?1280:760;state.transition=null;clearTimeout(operationTimer);
    setRunning(kind!=='fault'&&!faultLatched());state.pumpRunning=state.features.pump&&state.running;
    document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.toggle('selected',b.dataset.scenario===kind));render();
  }
  let operationTimer;
  function runMachine(run){
    if(run&&(state.scenario==='fault'||faultLatched())){toast('startBlocked');return;}
    if(run&&state.linkage==='remote'){toast('remoteBlocked');return;}
    if(state.transition||state.running===run)return;
    const restoreFocus=document.activeElement?.classList.contains('power-button');
    state.transition=run?'starting':'stopping';render();
    operationTimer=setTimeout(()=>{
      setRunning(run);state.transition=null;state.pumpRunning=run&&state.features.pump;render();
      if(restoreFocus&&state.page==='home'&&!state.modal&&document.activeElement===document.body)document.querySelector('.power-button:not(:disabled)')?.focus({preventScroll:true});
    },700);
  }
  function selectControlSource(source){
    if(!requireRole('user')||state.page!=='user'||!['local','remote'].includes(source)||state.linkage===source)return;
    state.linkage=source;render();
    toast(source==='remote'?'remoteSelected':'localSelected');
  }
  document.addEventListener('pointerdown',event=>{if(!observeActivity(event))event.preventDefault();},true);
  function cancelPowerPress(suppress=false){
    const press=powerPress;if(!press)return;
    powerPress=null;if(suppress)suppressPowerClick=true;
    if(press.element.hasPointerCapture(press.pointerId))press.element.releasePointerCapture(press.pointerId);
  }
  document.addEventListener('pointerdown',event=>{
    const element=event.target.closest('.power-button');
    if(event.defaultPrevented||!element?.isConnected||element.disabled||event.button!==0||!event.isPrimary)return;
    cancelPowerPress(true);suppressPowerClick=false;
    powerPress={element,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY};
    element.setPointerCapture(event.pointerId);
  });
  document.addEventListener('pointermove',event=>{
    const press=powerPress;if(!press||press.pointerId!==event.pointerId)return;
    if(Math.hypot(event.clientX-press.startX,event.clientY-press.startY)>8)cancelPowerPress(true);
  });
  document.addEventListener('pointerup',event=>{if(powerPress?.pointerId===event.pointerId)cancelPowerPress();});
  ['pointercancel','lostpointercapture'].forEach(type=>document.addEventListener(type,event=>{if(powerPress?.pointerId===event.pointerId)cancelPowerPress(true);}));

  document.addEventListener('input',observeActivity,true);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)ensureSession();});
  window.addEventListener('focus',ensureSession);
  document.addEventListener('click',event=>{
    if(!ensureSession()||!observeActivity(event))return;
    if((state.modal?.type==='language'&&!event.target.closest('.language-dropdown,.language-button'))||(state.modal?.type==='account'&&!event.target.closest('.account-dropdown,.user-button')))closeModal(false);
    const el=event.target.closest('button');
    if(el?.classList.contains('power-button')&&event.detail>0&&suppressPowerClick){suppressPowerClick=false;event.preventDefault();return;}
    if(!el||el.disabled)return;
    if(el.dataset.scenario){setScenario(el.dataset.scenario);return;}
    if(el.dataset.monitorSample){const sample=el.dataset.monitorSample;state.monitorSample=sample;monitorFields.forEach(field=>state.monitorReadings[field.key]=sample==='missing'?null:sample==='zero'?0:field.sample);render();return;}
    if(el.dataset.featurePage!==undefined){if(!requireRole('factory'))return;state.featurePage=Math.max(0,Math.min(featurePages.length-1,Number(el.dataset.featurePage)));render();$('feature-page-label').focus();return;}
    if(el.dataset.readingSample){const sample=el.dataset.readingSample;state.readingSample=sample;state.readings.inlet=sample==='missing'?null:sample==='zero'?0:800;state.readings.frequency=sample==='missing'?null:sample==='zero'?0:42.5;render();return;}
    if(el.dataset.pumpState){state.pumpFault=el.dataset.pumpState==='fault';state.pumpRunning=el.dataset.pumpState==='running'&&state.features.pump;render();return;}
    if(el.dataset.page){state.page=el.dataset.page;closeModal();render();return;}
    if(el.dataset.login){if(canAccess(el.dataset.login)){state.page=el.dataset.login;render();}else openModal({type:'login',role:el.dataset.login,value:'',fresh:true});return;}
    if(el.dataset.edit){const key=el.dataset.edit;if(!requireRole(parameterRole(key)))return;openModal({type:'number',key,title:el.dataset.title,unit:el.dataset.unit,max:Number(el.dataset.max),min:Number(el.dataset.min??0),value:String(key.startsWith('cal:')?state.calibrations[key.slice(4)]??(key.endsWith('zero')?0:3000):state.values[key]),fresh:true});return;}
    if(el.dataset.segment){
      const key=el.dataset.segment,value=el.dataset.value;
      if(key.startsWith('feature:')){if(!requireRole('factory'))return;const feature=key.slice(8);state.features[feature]=value==='true';if(feature==='pump')state.pumpRunning=state.features.pump&&state.running;}
      else if(key==='linkage'){selectControlSource(value);return;}
      else if(key==='loginTimeoutMode'){if(!requireRole('factory')||!['absolute','idle'].includes(value))return;state.loginTimeoutMode=value;}
      else return;
      render();return;
    }
    if(el.dataset.factoryTab){if(!requireRole('factory'))return;state.factoryTab=el.dataset.factoryTab;render();document.querySelector('.factory-tabs .active').focus();return;}
    if(el.dataset.language!==undefined){state.lang=Number(el.dataset.language);document.documentElement.lang=['zh-CN','en','ja'][state.lang];closeModal();render();document.querySelector('.language-button').focus();return;}
    if(el.dataset.key){
      const input=$('keypad-input'),m=state.modal,key=el.dataset.key;
      if(!input||!m)return;
      if(key==='backspace')input.value=input.value.slice(0,-1);
      else if(!(key==='.'&&(m.type==='login'||(m.type!=='version'&&input.value.includes('.')))))input.value=((m.fresh?'':input.value)+key).slice(0,m.type==='version'?11:12);
      if(m.type==='version'&&m.error){m.error=null;$('keypad-error').textContent='';}
      m.value=input.value;m.fresh=false;input.focus();return;
    }
    switch(el.dataset.action){
      case 'mode-settings-hint':toast('modeSettingsHint');break;
      case 'edit-version':if(requireRole('factory'))openModal({type:'version',value:state.version.slice(1),fresh:true});break;
      case 'language':if(state.modal?.type==='language')closeModal();else openModal({type:'language'});break;
      case 'user-access':if(state.loggedIn){if(state.modal?.type==='account')closeModal();else openModal({type:'account'});}else openModal({type:'login',value:'',fresh:true,returnToUserButton:true});break;
      case 'switch-account':openModal({type:'login',switching:true,value:'',fresh:true,returnToUserButton:true});break;
      case 'start':runMachine(true);break;
      case 'stop':runMachine(false);break;
      case 'logout':endSession();break;
      case 'close-modal':closeModal();break;
      case 'clear-input':if($('keypad-input')){$('keypad-input').value='';state.modal.value='';state.modal.fresh=false;$('keypad-input').focus();}break;
      case 'submit-input':submitInput();break;
      case 'confirm-modal':state.modal?.onConfirm?.();break;
      case 'reset-alarm':if(state.alarms.some(row=>row.condition)){toast('resetBlocked');}else if(activeCount()){state.alarms=[];render();toast('resetDone');}else toast('noReset');break;
    }
  });
  document.addEventListener('keydown',event=>{
    if(!ensureSession()||!observeActivity(event))return;
    if(event.target.closest('.preview-controller,#display-calibration-dialog'))return;
    if(event.key==='Escape'&&powerPress){event.preventDefault();cancelPowerPress(true);return;}
    if(!state.modal&&event.target.closest('.power-button')&&event.repeat&&['Enter',' '].includes(event.key)){event.preventDefault();return;}
    if(!state.modal&&event.target.closest('[data-factory-tab]')&&['ArrowUp','ArrowDown','Home','End'].includes(event.key)){
      event.preventDefault();if(!requireRole('factory'))return;
      const tabs=['features','tuning','calibration','sessionSettings'],index=tabs.indexOf(state.factoryTab);
      state.factoryTab=tabs[event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length];
      render();document.querySelector('.factory-tabs .active').focus();return;
    }
    if(event.target.closest('.language-button')&&['ArrowDown','ArrowUp'].includes(event.key)&&!state.modal){event.preventDefault();openModal({type:'language'});return;}
    if(event.target.closest('.user-button')&&state.loggedIn&&['ArrowDown','ArrowUp'].includes(event.key)&&!state.modal){event.preventDefault();openModal({type:'account'});return;}
    if(!state.modal)return;
    if(['language','account'].includes(state.modal.type)){
      const options=Array.from(document.querySelectorAll(state.modal.type==='language'?'.language-option':'.account-option'));
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
    if(event.key==='Escape')closeModal();if(event.key==='Enter'){event.preventDefault();if(state.modal.type==='confirm')state.modal.onConfirm?.();else submitInput();}});
  // Display calibration belongs to this browser, independently of HMI demo state.
  const sizeStorageKey='renbo-preview-size-v1';
  const enclosureModels={
    '226x163':{label:'资料第一组',width:226,height:163,opening:'215 × 152 mm'},
    '203x149':{label:'资料第二组',width:203,height:149,opening:'192 × 138 mm'},
    display:{label:'仅显示区',width:null,height:null,opening:''},
  };
  const previewSize={diagonal:7,enclosure:'226x163',calibration:null};
  let sizeStorageAvailable=true;
  function displayContext(){return `${screen.width}x${screen.height}@${window.devicePixelRatio||1}:${window.visualViewport?.scale||1}`;}
  function displayCalibrated(){return previewSize.calibration?.verified===true&&previewSize.calibration.context===displayContext();}
  try{
    const saved=JSON.parse(localStorage.getItem(sizeStorageKey));
    if(saved){
      if(Number.isFinite(saved.diagonal)&&saved.diagonal>=3&&saved.diagonal<=32)previewSize.diagonal=saved.diagonal;
      if(Object.hasOwn(enclosureModels,saved.enclosure))previewSize.enclosure=saved.enclosure;
      if(['1','1.25','1.5','fit','physical'].includes(saved.mode))$('preview-scale').value=saved.mode;
      if(saved.calibration?.verified===true&&Number.isFinite(saved.calibration.cssWidth)&&saved.calibration.cssWidth>0&&saved.calibration.cssWidth<=1600&&typeof saved.calibration.context==='string')previewSize.calibration=saved.calibration;
    }
  }catch{sizeStorageAvailable=false;}
  $('physical-diagonal').value=previewSize.diagonal;
  $('physical-enclosure').value=previewSize.enclosure;
  const calibrationSlider=$('calibration-ruler-width');
  function savePreviewSize(){
    try{localStorage.setItem(sizeStorageKey,JSON.stringify({...previewSize,mode:$('preview-scale').value}));sizeStorageAvailable=true;}
    catch{sizeStorageAvailable=false;}
  }
  function resize(){
    cancelPowerPress(true);
    const chosen=$('preview-scale').value;
    const physical=chosen==='physical';
    const availableWidth=Math.max(240,window.innerWidth-28);
    const availableHeight=Math.max(1,window.innerHeight-28);
    const maxScale=Math.min(1.5,availableWidth/800,availableHeight/480);
    const calibrated=displayCalibrated();
    const pixelsPerMm=calibrated?previewSize.calibration.cssWidth/100:0;
    const enclosure=enclosureModels[previewSize.enclosure];
    const hasEnclosure=previewSize.enclosure!=='display';
    const diagonal=hasEnclosure?7:previewSize.diagonal;
    const widthMm=diagonal*25.4*800/Math.hypot(800,480),heightMm=widthMm*480/800;
    const deviceWidthMm=enclosure.width??widthMm,deviceHeightMm=enclosure.height??heightMm;
    const innerWidthPx=widthMm*pixelsPerMm,innerHeightPx=heightMm*pixelsPerMm;
    const scale=physical?widthMm*pixelsPerMm/800:chosen==='fit'?maxScale:Math.min(Number(chosen),maxScale);
    const deviceWidthPx=physical?deviceWidthMm*pixelsPerMm:800*scale,deviceHeightPx=physical?deviceHeightMm*pixelsPerMm:480*scale;
    document.querySelector('.preview').classList.toggle('physical-mode',physical);
    $('physical-size-controls').hidden=!physical;
    $('logical-size-hint').hidden=physical;
    $('physical-size-badge').hidden=!physical;
    $('physical-diagonal').value=diagonal;$('physical-diagonal').disabled=hasEnclosure;
    $('physical-dimensions').textContent=`显示区估算 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · ${diagonal}″`;
    $('physical-display-hint').textContent=hasEnclosure?'此设备为七寸屏。显示区宽高按 800∶480 估算，居中位置及外壳样式为示意；精确显示区尺寸、定位待厂家图纸核实。':'显示区宽高按对角线和 800∶480 估算，不含外壳。';
    const status=calibrated?(previewSize.calibration.method==='monitor'?'已按 27″ · 1920×1080 换算':'已用尺子校准'):previewSize.calibration?'显示环境已变化，请重新校准':'待校准 · 不显示真实物理比例';
    $('physical-calibration-status').textContent=status+(sizeStorageAvailable?'':' · 无法保存，仅本次有效');
    $('physical-calibration-status').dataset.calibrated=String(calibrated);
    $('physical-enclosure-dimensions').textContent=hasEnclosure?`整机外形 ${enclosure.width} × ${enclosure.height} mm；机柜开孔 ${enclosure.opening}（仅作安装参考）。`:'当前仅显示液晶画面，不包含整机外形。';
    $('physical-size-badge').textContent=!calibrated?`物理尺寸模式 · ${status}`:hasEnclosure?`整机外形 ${enclosure.width} × ${enclosure.height} mm · ${status}`:`${diagonal}″显示区比例估算 · ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · ${status}`;
    $('screen-stage').style.width=800*scale+'px';$('screen-stage').style.height=480*scale+'px';$('hmi').style.transform=`scale(${scale})`;
    $('screen-device').classList.toggle('physical-casing',physical&&previewSize.enclosure!=='display');
    $('screen-device').style.width=deviceWidthPx+'px';$('screen-device').style.height=deviceHeightPx+'px';
    $('screen-device').dataset.dimensions=`整机外形 ${deviceWidthMm} × ${deviceHeightMm} mm`;
    $('screen-stage').style.position=physical?'absolute':'relative';
    $('screen-stage').style.left=physical?(deviceWidthPx-innerWidthPx)/2+'px':'0px';
    $('screen-stage').style.top=physical?(deviceHeightPx-innerHeightPx)/2+'px':'0px';
    $('screen-stage').style.boxShadow=physical&&previewSize.enclosure!=='display'?'0 0 0 1px #536169':'0 18px 48px #18334f2b';
    const preview=document.querySelector('.preview');
    const overflowing=deviceWidthPx>preview.clientWidth-28||deviceHeightPx>preview.clientHeight-108;
    $('physical-overflow-hint').hidden=!physical||!calibrated||!overflowing;
    $('physical-size-gate').hidden=!physical||calibrated;
    $('screen-device').hidden=physical&&!calibrated;
    if(['language','account'].includes(state.modal?.type)){if(physical&&!calibrated)closeModal(false);else renderModal();}
    if($('display-calibration-dialog').open)updateCalibrationRuler();
  }
  $('physical-diagonal-form').addEventListener('submit',event=>event.preventDefault());
  $('physical-diagonal').addEventListener('input',()=>{
    const input=$('physical-diagonal');
    if(input.disabled||!input.checkValidity())return;
    previewSize.diagonal=input.valueAsNumber;savePreviewSize();resize();
  });
  $('physical-diagonal').addEventListener('change',()=>{
    const input=$('physical-diagonal');
    if(!input.checkValidity()){input.reportValidity();input.value=previewSize.diagonal;}
  });
  $('physical-enclosure').addEventListener('change',event=>{
    if(!Object.hasOwn(enclosureModels,event.target.value))return;
    previewSize.enclosure=event.target.value;savePreviewSize();resize();
  });
  function updateCalibrationRuler(){
    const lineWidth=Math.max(20,Math.min(1600,Number(calibrationSlider.value)||378));
    const svg=$('physical-reference'),path=$('physical-reference-path');
    svg.setAttribute('width',lineWidth+2);svg.setAttribute('viewBox',`0 0 ${lineWidth+2} 36`);
    path.setAttribute('d',`M1 3v30M1 18h${lineWidth}M${lineWidth+1} 3v30`);
    const fits=lineWidth+2<=$('calibration-ruler-viewport').clientWidth;
    $('calibration-fit-warning').hidden=fits;
    $('calibration-confirm').disabled=!fits;
    return lineWidth;
  }
  function openCalibration(){
    calibrationSlider.value=previewSize.calibration?.cssWidth||378;
    const dialog=$('display-calibration-dialog');
    if(!dialog.open)dialog.showModal();
    updateCalibrationRuler();
  }
  $('physical-calibration-open').addEventListener('click',openCalibration);
  $('physical-calibration-start').addEventListener('click',openCalibration);
  document.querySelectorAll('[data-monitor-calibrate]').forEach(button=>button.addEventListener('click',()=>{
    // Device pixels / CSS pixel includes desktop browser zoom; pinch zoom is separate.
    const pixelRatio=(window.devicePixelRatio||1)*(window.visualViewport?.scale||1);
    const pixelsPerMm=Math.hypot(1920,1080)/(27*25.4*pixelRatio);
    previewSize.calibration={cssWidth:pixelsPerMm*100,method:'monitor',verified:true,context:displayContext()};
    $('preview-scale').value='physical';savePreviewSize();$('display-calibration-dialog').close();resize();
  }));
  calibrationSlider.addEventListener('input',updateCalibrationRuler);
  $('calibration-shorter').addEventListener('click',()=>{calibrationSlider.value=Math.max(20,Number(calibrationSlider.value)-1);updateCalibrationRuler();});
  $('calibration-longer').addEventListener('click',()=>{calibrationSlider.value=Math.min(1600,Number(calibrationSlider.value)+1);updateCalibrationRuler();});
  $('calibration-cancel').addEventListener('click',()=>$('display-calibration-dialog').close());
  $('calibration-confirm').addEventListener('click',()=>{
    const lineWidth=updateCalibrationRuler();
    if($('calibration-confirm').disabled)return;
    previewSize.calibration={cssWidth:lineWidth,verified:true,context:displayContext()};savePreviewSize();$('display-calibration-dialog').close();resize();
  });
  $('physical-calibration-reset').addEventListener('click',()=>{
    previewSize.calibration=null;savePreviewSize();resize();
  });
  // Preview-only appearance choices never write equipment configuration or authentication state.
  const appearanceChoices={frame:['baseline','navy','graphite'],pump:['flow','compact']};
  Object.entries(appearanceChoices).forEach(([key,choices])=>{
    $('preview-'+key).addEventListener('change',event=>{
      if(!choices.includes(event.target.value))return;
      previewAppearance[key]=event.target.value;render();
    });
  });
  $('preview-appearance-reset').addEventListener('click',()=>{
    Object.assign(previewAppearance,{frame:'baseline',pump:'flow'});
    Object.entries(previewAppearance).forEach(([key,value])=>$('preview-'+key).value=value);render();
  });
  $('preview-total-hours').addEventListener('change',event=>{state.totalBaseMs=Number(event.target.value)*3600000;render();});
  $('preview-scale').addEventListener('change',()=>{savePreviewSize();resize();if($('preview-scale').value==='physical'&&!displayCalibrated())openCalibration();});window.addEventListener('resize',resize);
  window.visualViewport?.addEventListener('resize',resize);

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
  render();resize();updateCalibrationRuler();
})();
