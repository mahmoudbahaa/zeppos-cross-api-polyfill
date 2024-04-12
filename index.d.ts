
/**
  * @zh 定时器
  * @en Alarm
  */
declare module 'zeppos-cross-api/alarm' {

  /**
   * @zh 重复一次
   * @en Repeat once
   * @version 3.0
   */
  const REPEAT_ONCE: number
  /**
   * @zh 每分钟重复一次
   * @en Repeat once per minute
   * @version 3.0
   */
  const REPEAT_MINUTE: number
  /**
   * @zh 每小时重复一次
   * @en Repeat once per hour
   * @version 3.0
   */
  const REPEAT_HOUR: number
  /**
   * @zh 每天重复一次
   * @en Repeat once per day
   * @version 3.0
   */
  const REPEAT_DAY: number
  /**
   * @zh 每周重复一次
   * @en Repeat once per week
   * @version 3.0
   */
  const REPEAT_WEEK: number
  /**
   * @zh 每月重复一次
   * @en Repeat once per month
   * @version 3.0
   */
  const REPEAT_MONTH: number
  /**
   * @zh 每年重复一次
   * @en Repeat once per year
   * @version 3.0
   */
  const REPEAT_YEAR: number
  /**
   * @zh 星期一
   * @en Monday
   * @version 3.0
   */
  const WEEK_MON: number
  /**
   * @zh 星期二
   * @en Tuesday
   * @version 3.0
   */
  const WEEK_TUE: number
  /**
   * @zh 星期三
   * @en Wednesday
   * @version 3.0
   */
  const WEEK_WED: number
  /**
   * @zh 星期四
   * @en Thursday
   * @version 3.0
   */
  const WEEK_THU: number
  /**
   * @zh 星期五
   * @en Friday
   * @version 3.0
   */
  const WEEK_FRI: number
  /**
   * @zh 星期六
   * @en Saturday
   * @version 3.0
   */
  const WEEK_SAT: number
  /**
   * @zh 星期日
   * @en Sunday
   * @version 3.0
   */
  const WEEK_SUN: number
  namespace set {
    interface Option {
      /**
       * @zh 小程序的 App ID，默认当前小程序 ID
       * @en App ID of the Mini Program, default current Mini Program ID
       */
      appid?: number
      /**
       * @zh 唤醒小程序的文件路径，支持「设备应用服务」
       * @en File path to wake up Mini Program, supporting App Service
       */
      file: string
      /**
       * @zh 定时器执行的时间，UTC 时间戳，单位秒，该字段优先级高于 `delay`
       * @en Timer execution time, UTC timestamp, in seconds, this field has higher priority than `delay`
       */
      time?: number
      /**
       * @zh 基于当前时间的延迟多少秒后执行，单位秒
       * @en How many seconds of delay based on the current time after the execution, in seconds
       */
      delay?: number
      /**
       * @zh 定时器是否需要持久化存储（设备重启后依然能够成功执行）
       * @en Does the timer need persistent storage (can still be executed successfully after device reboot)
       * @defaultValue false
       */
      store?: boolean
      /**
       * @zh 定时器的重复类型，参考定时器定期重复常量
       * @en Timer repetition type, refer to timer periodic repetition constants
       */
      repeat_type?: number
      /**
       * @zh 当 repeat_type 设置为 `REPEAT_MINUTE`、`REPEAT_HOUR`、`REPEAT_DAY` 时生效，与 repeat_duration 配合使用，设置一个重复周期，一个重复周期以当前的 `repeat_type` 为单位，包含 `repeat_period` 次，提醒前 `repeat_duration` 次
       * @en Effective when repeat_type is set to `REPEAT_MINUTE`, `REPEAT_HOUR`, `REPEAT_DAY`, used in conjunction with repeat_duration to set a repeat period, one repeat period in the current `repeat_type`, containing `repeat_period` times, and `repeat_duration` times before the reminder
       */
      repeat_period?: number
      /**
       * @zh 当 repeat_type 设置为 `REPEAT_MINUTE`、`REPEAT_HOUR`、`REPEAT_DAY` 时生效，定时器一个周期内提醒的次数，与 `repeat_duration` 配合使用，一个周期以当前的 `repeat_type` 为单位，包含 repeat_period 次，提醒前 `repeat_duration` 次
       * @en When repeat_type is set to `REPEAT_MINUTE`, `REPEAT_HOUR`, `REPEAT_DAY`, the number of reminders in a period of the timer, used with `repeat_duration`, a period of the current `repeat_type`, including repeat_period times, `repeat_duration` times before the reminder
       */
      repeat_duration?: number
      /**
       * @zh 当 `repeat_type` 为 `REPEAT_WEEK` 时生效，可以自定义一周内重复哪几天，参考定时器周常量
       * @en Effective when `repeat_type` is `REPEAT_WEEK`, you can customize which days of the week are repeated, refer to the timer week constants
       */
      week_days?: number
      /**
       * @zh 重复提醒开始的时间，UTC 秒，重复提醒只在重复时间段内生效
       * @en The time when the repeat reminder starts, in UTC seconds, and the repeat reminder only takes effect during the repeat time period
       */
      start_time?: number
      /**
       * @zh 重复提醒结束的时间，UTC 秒，重复提醒只在重复时间段内生效
       * @en The time when the repeat reminder ends, in UTC seconds, and the repeat reminder only takes effect during the repeat time period
       */
      end_time?: number
    }

    /**
     * @zh 创建定时器返回的 id，`0` 为无效 ID，表示定时器创建失败，支持持久化的定时器在系统重启后，ID 仍保持不变
     * @en The id returned by the timer creation, `0` is an invalid ID, which means the timer creation failed, and the ID remains the same after the system restart for timers that support persistence
     */
    type Result = number
  }

  /**
   * @zh 支持持久化的定时器，用来唤醒小程序的页面
   * @en Support for persistent timers to wake up pages of Mini Program
   * @constants alarm_repeat,alarm_week
   * @permissionCode device:os.alarm
   * @version 3.0
   * @example
   * ```js
   * // At a certain time each day
   * import { set, REPEAT_DAY } from 'zeppos-cross-api/alarm'
   *
   * const option = {
   *   file: 'pages/loadingWidget.js',
   *   time: 12345678,
   *   repeat_type: REPEAT_DAY
   * }
   * const id = set(option)
   *
   * // Every Monday and Wednesday
   * import { set, REPEAT_WEEK, WEEK_MON, WEEK_WED } from 'zeppos-cross-api/alarm'
   *
   * const option = {
   *   file: 'pages/loadingWidget.js',
   *   time: 12345678,
   *   repeat_type: REPEAT_WEEK,
   *   week_days: WEEK_MON| WEEK_WED
   * }
   * const id = set(option)
   *
   * // Reminder every 21 days
   * import { set, REPEAT_DAY } from 'zeppos-cross-api/alarm'
   *
   * const option = {
   *   file: 'pages/loadingWidget.js',
   *   time: 12345678,
   *   repeat_type: REPEAT_DAY,
   *   repeat_period: 20,
   *   repeat_duration: 1,
   * }
   * const id = set(option)
   * ```
   */
  function set(option: set.Option): set.Result
  namespace cancel {
    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 取消设置的定时器，如果定时器设置了持久化，同时取消持久化，alarmId 由 `set` 返回
   * @en Cancels the set timer, if the timer is set to persist and also cancels the persistence, alarmId is returned by `set`
   * @permissionCode device:os.alarm
   * @version 3.0
   * @example
   * ```js
   * import { stop } from 'zeppos-cross-api/alarm'
   *
   * stop(alarmID)
   * ```
   */
  function cancel(alarmId: number): cancel.Result
  /**
   * @zh 获取当前小程序所有已创建的定时器 alarmId 数组, 包括支持持久化的定时器
   * @en Get an array of all created timers alarmId for the current Mini Program, including timers that support persistence
   * @permissionCode device:os.alarm
   * @version 3.0
   * @example
   * ```js
   * import { getAlarmList } from 'zeppos-cross-api/alarm'
   *
   * getAlarmList()
   * ```
   */
  function getAlarmList(): Array<number>}

/**
  * @zh 小程序
  * @en Mini Program related
  */
declare module 'zeppos-cross-api/app' {

  /**
   * @zh 在小程序内
   * @en In Mini Program
   */
  const SCENE_APP: number
  /**
   * @zh 在表盘主界面
   * @en In watchface interface
   */
  const SCENE_WATCHFACE: number
  /**
   * @zh 在小程序配置或者表盘编辑页面
   * @en In the Mini Program configuration or dial edit page
   */
  const SCENE_SETTINGS: number
  /**
   * @zh 在息屏界面
   * @en In the rest screen screen
   */
  const SCENE_AOD: number
  namespace getPackageInfo {
    interface IHmAppPackageInfo {
      name: string
      type: string
      version: { code: number, name: string }
      icon: string
      appId: number
      description: string
      vender: string
      permissions: Array<string>
      pages: Array<string>
      [key: string]: any;
    }

    // interface IHmAppPackageExtraInfo = object

    /**
     * @zh 此处不一一列举，请参考 `app.json` 中字段
     * @en Please see the fields in `app.json` for more details
     */
    type Result = IHmAppPackageInfo
  }

  /**
   * @zh 获取小程序配置 `app.json` 中的部分字段
   * @en Get some of the fields in the Mini Program configuration `app.json`
   * @example
   * ```js
   * import { getPackageInfo } from 'zeppos-cross-api/app'
   *
   * const packageInfo = getPackageInfo()
   * console.log(packageInfo.name)
   * ```
   */
  function getPackageInfo(): getPackageInfo.Result
  namespace getScene {
    /**
     * @zh 当前小程序运行的场景，值参考场景常量
     * @en The current scene in which the Mini Program is running, value reference scene constants
     */
    type Result = number
  }

  /**
   * @zh 获取当前小程序运行的场景
   * @en Get the current scene where the Mini Program is running
   * @constants scene
   * @example
   * ```js
   * import { getScene, SCENE_APP } from 'zeppos-cross-api/app'
   *
   * const result = getScene()
   *
   * if (result === SCENE_APP) {
   *   console.log('in Mini Program')
   * }
   * ```
   */
  function getScene(): getScene.Result
  namespace queryPermission {
    interface Option {
      /**
       * @zh 权限字符串数组，数组长度至少为 `1`
       * @en An array of permission strings, with an array length of at least `1`
       */
      permissions: Array<string>
    }

    /**
     * @zh 权限查询结果数组，与 `permissions` 数组顺序一一对应，`0`: 未授权、`1`: 未知权限、`2`：已授权
     * @en Permissions query result array, corresponding to the order of `permissions` array, `0`: not authorized, `1`: unknown permissions, `2`: authorized
     */
    type Result = Array<number>
  }

  /**
   * @zh 查询小程序权限的授权状态
   * @en Check the authorization status of Mini Program permissions
   * @version 3.0
   * @example
   * ```js
   * import { queryPermission } from 'zeppos-cross-api/app'
   *
   * const result = queryPermission()
   * console.log(result)
   * ```
   */
  function queryPermission(option: queryPermission.Option): queryPermission.Result
  namespace requestPermission {
    interface Option {
      /**
       * @zh 权限字符串数组，数组长度至少为 `1`
       * @en An array of permission strings, with an array length of at least `1`
       */
      permissions: Array<string>
      /**
       * @zh 权限申请结果回调函数
       * @en Permission request result callback function
       */
      function: (result: Array<number>) => void
    }

    /**
     * @zh 方法结果值，值描述见 `result`
     * @en Method result value. See 'result' for a description
     */
    type Result = number

    /**
     * @output
     * @enum
     */
    interface result {
      /**
       * @zh 授权处理中，将触发用户交互，并在回调函数中告知用户授权结果
       * @en In authorization processing, user interaction will be triggered, and the user will be informed of the authorization result in the callback function
       */
      0: number
      /**
       * @zh 没有可以授权的权限
       * @en There are no authorization requests that can be made
       */
      1: number
      /**
       * @zh 所申请接口已经获得授权，可以立即调用
       * @en The requested interface is authorized and can be called immediately
       */
      2: number
    }
  }

  /**
   * @zh 动态权限申请，当查询某个动态权限尚未授权时，可使用该接口申请相关权限。一般在使用系统相关功能接口（如启用设备应用服务的接口）前，做相关权限的检查和申请，否则功能接口会因权限问题不被允许执行
   * @en Dynamic permission application, when querying a dynamic permission has not been authorized, you can use this interface to apply for the relevant permission. Generally, before using the system-related functional interface (such as the interface to enable app services), do the relevant permission check and application, otherwise the functional interface will not be allowed to execute due to the permission issue
   * @version 3.0
   * @example
   * ```js
   * import { requestPermission } from 'zeppos-cross-api/app'
   *
   * const result = requestPermission({
   *   permissions: ['device:os.bg_service'],
   *   function: (result) => {
   *     console.log(result)
   *   }
   * })
   * console.log(result)
   * ```
   */
  function requestPermission(option: requestPermission.Option): requestPermission.Result
  namespace emitCustomSystemEvent {
    interface Option {
      /**
       * @zh 自定义事件名称，需要满足 `event.customize.${event}` 的命名约定
       * @en Customize event names that meet the naming convention of 'event.customize.${event}'
       */
      eventName: string
      /**
       * @zh 自定义事件参数
       * @en Custom event parameters
       */
      eventParam: string
    }
  }

  /**
   * @zh 小程序可以自定义系统事件，并可以主动派发该自定义系统事件
   * @en The Mini Program can customize the system events and can actively dispatch the custom system events
   * @version 3.0
   * @example
   * ```js
   * import { emitCustomSystemEvent } from 'zeppos-cross-api/app'
   *
   * emitCustomSystemEvent('event.customize.test')
   * ```
   */
  function emitCustomSystemEvent(option: emitCustomSystemEvent.Option): void}

/**
  * @zh 设备应用服务
  * @en App Service
  */
declare module 'zeppos-cross-api/app-service' {

  namespace start {
    interface Option {
      /**
       * @zh 设备应用服务 js 文件，必须是在 app.json module 中 app-service 字段配置的文件
       * @en The App Service js file must be the one configured in the module app-service in app.json
       */
      file: string
      /**
       * @zh 设备应用服务 js 文件加载时，传入的参数
       * @en Parameters passed in when the js file is loaded by the backend service
       */
      param?: string
      /**
       * @zh 设备应用服务启动完成回调函数
       * @en Callback function for the completion of the backend service start
       */
      complete_func: (callbackOption: CallbackOption) => void
    }

    /**
     * @output
     */
    interface CallbackOption {
      /**
       * @zh 设备应用服务 js 文件，与 `start` 传入参数相同
       * @en App service js file, same as `start` incoming parameters
       */
      file: string
      /**
       * @zh 设备应用服务启动结果，`true` 代表成功，`false` 代表失败
       * @en App service start result, `true` means success, `false` means failure
       */
      result: boolean
    }

    /**
     * @zh 如果返回 `0` 则表明设备应用服务启动成功，其余值的含义参考 ERROR_CODE
     * @en If `0` is returned, The App Service was started successfully.
     */
    type Result = boolean

    /**
     * @output
     * @enum
     */
    interface ERROR_CODE {
      /**
       * @zh 成功
       * @en Success
       */
      0: number
      /**
       * @zh 参数错误
       * @en Parameter error
       */
      1: number
      /**
       * @zh 服务状态错误
       * @en Service Status Error
       */
      2: number
      /**
       * @zh 无权限
       * @en No Permission
       */
      3: number
      /**
       * @zh 内存不足
       * @en Out Of Memory
       */
      4: number
      /**
       * @zh 不支持
       * @en Not Supported
       */
      5: number
      /**
       * @zh 服务被禁止
       * @en Prohibited
       */
      6: number
      /**
       * @zh 服务数量已达系统限制
       * @en The number of services has reached the system limit
       */
      7: number
      /**
       * @zh 未知错误
       * @en Unknown Error
       */
      255: number
    }
  }

  /**
   * @zh 启动指定的设备应用服务，启动结果通过回调函数返回
   * @en Start the specified App service, return the result through the callback function
   * @permissionCode device:os.bg_service
   * @version 3.0
   * @example
   * ```js
   * import { start } from 'zeppos-cross-api/app-service'
   * ```
   */
  function start(option: start.Option): start.Result
  namespace stop {
    interface Option {
      /**
       * @zh 设备应用服务 js 文件，必须是在 app.json 中 service module 中配置的文件
       * @en The App Service js file must be the one configured in the service module in app.json
       */
      file: string
      /**
       * @zh 设备应用服务关闭完成回调函数
       * @en Callback function for the completion of the backend service stop
       */
      complete_func: (callbackOption: CallbackOption) => void
    }

    /**
     * @output
     */
    interface CallbackOption {
      /**
       * @zh 设备应用服务 js 文件，与 `stop` 传入参数相同
       * @en App service js file, same as `stop` incoming parameters
       */
      file: string
      /**
       * @zh 设备应用服务关闭结果，`true` 代表成功，`false` 代表失败
       * @en App service stop result, `true` means success, `false` means failure
       */
      result: boolean
    }

    /**
     * @zh 如果返回 `0` 则表明设备应用服务关闭成功
     * @en If `0` is returned, The App Service is closed successfully
     */
    type Result = boolean
  }

  /**
   * @zh 关闭指定的设备应用服务，异步调用，关闭结果通过回调函数返回
   * @en Shutdown the specified backend service, called asynchronously, with the shutdown result returned via a callback function
   * @permissionCode device:os.bg_service
   * @version 3.0
   * @example
   * ```js
   * import { stop } from 'zeppos-cross-api/app-service'
   * ```
   */
  function stop(option: stop.Option): stop.Result
  namespace getAllAppServices {
    /**
     * @zh 获取当前正在运行的设备应用服务列表
     * @en Get the list of currently running App services
     */
    type Result = Array<string>
  }

  /**
   * @zh 获取当前应用在运行的设备应用服务列表，用于查询服务状态
   * @en Get the list of running App services, used to query the service status
   * @permissionCode device:os.bg_service
   * @version 3.0
   * @example
   * ```js
   * import { getAllAppServices } from 'zeppos-cross-api/app-service'
   *
   * const serviceList = getAllAppServices()
   * console.log(serviceList)
   * ```
   */
  function getAllAppServices(): getAllAppServices.Result
  /**
   * @zh 在设备应用服务中调用，会退出该服务，不会影响前台页面
   * @en Called in The App Service, it will exit the service and will not affect the foreground page
   * @permissionCode device:os.bg_service
   * @version 3.0
   * @example
   * ```js
   * import { exit } from 'zeppos-cross-api/app-service'
   *
   * exit()
   * ```
   */
  function exit(): void}

/**
  * @zh BLE
  * @en BLE
  */
declare module 'zeppos-cross-api/ble' {

  namespace mstStartScan {
    /**
     * @zh 接收扫描结果回调函数
     * @en Callback function for receiving scan results
     */
    type Callback = (result: ScanResult, filter?: Filter) => void

    /**
     * @output
     */
    interface ScanResult {
      /**
       * @zh 设备名称
       * @en Device name
       */
      dev_name: string
      /**
       * @zh 设备 MAC 地址，长度 6 字节，建议使用 Uint8Array 视图
       * @en Device MAC address, 6 bytes long, Uint8Array view recommended
       */
      dev_addr: ArrayBuffer
      /**
       * @zh RSSI 信号强度
       * @en RSSI Signal Strength
       */
      rssi: number
      /**
       * @zh 广播数据中的 Service UUID 数组
       * @en Service UUID array in broadcast data
       */
      service_uuid_array: Array<string>
      /**
       * @zh 广播数据中的 Service 数据对象数组
       * @en Array of Service Data Objects in Broadcast Data
       */
      service_data_array: Array<ServiceData>
    }

    /**
     * @output
     */
    interface ServiceData {
      /**
       * @zh Service UUID
       * @en Service UUID
       */
      uuid: string
      /**
       * @zh Service 数据
       * @en Service data
       */
      service_data: ArrayBuffer
    }

    interface Filter {
      /**
       * @zh 设备名称
       * @en Device name
       */
      device_name?: string
      /**
       * @zh 设备名称匹配是否采用模糊模式
       * @en Whether to use fuzzy mode for device name matching
       */
      fuzzy_mode?: string
      /**
       * @zh Service UUID
       * @en Service UUID
       */
      service_uuid?: string
      /**
       * @zh Service 数据 UUID
       * @en Service data UUID
       */
      service_data_uuid?: string
      /**
       * @zh 设备商 ID
       * @en Manufacturer ID
       */
      manufacturer_id?: number
    }

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 扫描并发现蓝牙外围设备，可以根据 filter 条件进行过滤
   * @en Scan and discover Bluetooth peripherals, which can be filtered according to filter conditions
   * @version 3.0
   * @example
   * ```js
   * import { mstStartScan } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstStartScan(
    callback: mstStartScan.Callback,
    filter?: mstStartScan.Filter,
  ): mstStartScan.Result
  namespace mstStopScan {
    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 停止设备扫描，与 `mstStartScan` 配套使用
   * @en Stop device scanning, used in conjunction with `mstStartScan`
   * @version 3.0
   * @example
   * ```js
   * import { mstStopScan } from 'zeppos-cross-api/ble'
   *
   * mstStopScan()
   * ```
   */
  function mstStopScan(): mstStopScan.Result
  namespace mstConnect {
    /**
     * @zh 设备 MAC 地址，长度 6 字节，建议使用 Uint8Array 视图
     * @en Device MAC address, 6 bytes long, Uint8Array view recommended
     */
    type DeviceAddress = ArrayBuffer

    /**
     * @zh 连接结果回调函数
     * @en Connection result callback function
     */
    type Callback = (result: ConnectResult) => void

    /**
     * @output
     */
    interface ConnectResult {
      /**
       * @zh 连接状态，`0` - 连接成功、`1` - 连接失败、`2` - 断连
       * @en Connection status, `0` - successful connection, `1` - failed connection, `2` - disconnected
       */
      connected: number
      /**
       * @zh 连接成功时返回连接的 ID
       * @en The ID of the connection is returned when the connection is successful
       */
      connect_id: number
      /**
       * @zh 设备 MAC 地址，长度 6 字节，建议使用 Uint8Array 视图
       * @en Device MAC address, 6 bytes long, Uint8Array view recommended
       */
      dev_addr: ArrayBuffer
    }

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 连接设备
   * @en Connecting Devices
   * @version 3.0
   * @example
   * ```js
   * import { mstConnect } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstConnect(
    deviceAddress: mstConnect.DeviceAddress,
    callback: mstConnect.Callback,
  ): mstConnect.Result
  namespace mstDisconnect {
    /**
     * @zh 使用 `mstConnect` API 连接成功时返回的连接 ID
     * @en The connection ID returned when the connection is successful using the `mstConnect` API
     */
    type ConnectId = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 断开设备连接
   * @en Disconnecting devices
   * @version 3.0
   * @example
   * ```js
   * import { mstDisconnect } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstDisconnect(connectId: mstDisconnect.ConnectId): mstDisconnect.Result
  namespace mstPair {
    /**
     * @zh 使用 `mstConnect` API 连接成功时返回的连接 ID
     * @en The connection ID returned when the connection is successful using the `mstConnect` API
     */
    type ConnectId = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 通过 `connectId` 与设备进行配对
   * @en Pairing with devices via `connectId`
   * @version 3.0
   * @example
   * ```js
   * import { mstPair } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstPair(connectId: mstPair.ConnectId): mstPair.Result
  namespace mstGetConnIdByRemoteAddr {
    /**
     * @zh 设备 MAC 地址，长度 6 字节，建议使用 Uint8Array 视图
     * @en Device MAC address, 6 bytes long, Uint8Array view recommended
     */
    type DeviceAddress = ArrayBuffer

    /**
     * @zh 函数调用结果，查询成功返回 `connectId`，查询失败返回 `undefined`
     * @en The result of the function call returns `connectId` for a successful query and `undefined` for a failed query.
     */
    type Result = number | undefined
  }

  /**
   * @zh 根据从机 MAC 地址查询连接 Id
   * @en Look up the connection Id based on the Peripheral MAC address
   * @version 3.0
   * @example
   * ```js
   * import { mstGetConnIdByRemoteAddr } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstGetConnIdByRemoteAddr(
    deviceAddress: mstGetConnIdByRemoteAddr.DeviceAddress,
  ): mstGetConnIdByRemoteAddr.Result
  namespace mstBuildProfile {
    interface ProfileObj {
      /**
       * @zh 是否自动配对
       * @en Whether to pair automatically
       */
      pair: boolean
      /**
       * @zh 连接 ID
       * @en Connection ID
       */
      id: number
      /**
       * @zh Profile 名称
       * @en Profile Name
       */
      profile: string
      /**
       * @zh 设备 MAC 地址，长度 6 字节，建议使用 Uint8Array 视图
       * @en Device MAC address, 6 bytes long, Uint8Array view recommended
       */
      dev: ArrayBuffer
      /**
       * @zh `list` 数组长度
       * @en `list` array length
       */
      len: number
      /**
       * @zh Services list 数组
       * @en Services list array
       */
      list: Array<ServicesObj>
    }

    interface ServicesObj {
      /**
       * @zh `list` 数组长度
       * @en `list` array length
       */
      len: number
      /**
       * @zh Service 数组
       * @en Service array
       */
      list: Array<ServiceObj>
    }

    interface ServiceObj {
      /**
       * @zh Service UUID
       * @en Service UUID
       */
      uuid: string
      /**
       * @zh 权限控制，默认 `0` 不控制
       * @en Permission control, default `0` No control
       * @defaultValue 0
       */
      permission?: number
      /**
       * @zh Characteristic 数组长度
       * @en Characteristic array length
       */
      len1: number
      /**
       * @zh Characteristic 数组
       * @en Characteristic length
       */
      list: Array<CharacteristicObj>
    }

    interface CharacteristicObj {
      /**
       * @zh Characteristic UUID
       * @en Characteristic UUID
       */
      uuid: string
      /**
       * @zh 权限控制，默认 `0` 不控制
       * @en Permission control, default `0` No control
       * @defaultValue 0
       */
      permission?: number
      /**
       * @zh Descriptor 数组长度
       * @en Descriptor array length
       */
      len: number
      /**
       * @zh Descriptor 数组
       * @en Descriptor array
       */
      list: Array<DescriptorObj>
    }

    interface DescriptorObj {
      /**
       * @zh Descriptor UUID
       * @en Descriptor UUID
       */
      uuid: string
      /**
       * @zh 权限控制，默认 `0` 不控制
       * @en Permission control, default `0` No control
       * @defaultValue 0
       */
      permission?: number
    }

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 创建 Profile 连接
   * @en Creating a Profile connection
   * @version 3.0
   * @example
   * ```js
   * import { mstGetConnIdByRemoteAddr } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstBuildProfile(profile: mstBuildProfile.ProfileObj): mstBuildProfile.Result
  namespace mstOnPrepare {
    /**
     * @zh 监听 prepare 事件回调函数
     * @en Listening to the prepare event callback function
     */
    type Callback = (profile: Profile, status: Status) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 prepare 操作回调函数
   * @en Register the prepare operation callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnPrepare } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnPrepare(callback: mstOnPrepare.Callback): mstOnPrepare.Result
  namespace mstOnCharaReadComplete {
    /**
     * @zh 读取 Characteristic 完成回调函数
     * @en Read Characteristic Completion Callback Function
     */
    type Callback = (profile: Profile, uuid: UUID, status: Status) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册读取 Characteristic 完成回调函数
   * @en Register the read Characteristic completion callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnCharaReadComplete } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnCharaReadComplete(
    callback: mstOnCharaReadComplete.Callback,
  ): mstOnCharaReadComplete.Result
  namespace mstOnCharaValueArrived {
    /**
     * @zh 读取 Characteristic 数据到达回调函数
     * @en Read Characteristic data to the callback function
     */
    type Callback = (profile: Profile, uuid: UUID, data: Data, status: Status) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh 读取到的数据，使用 Uint8Array 视图读取
     * @en Reads the data using the Uint8Array view
     */
    type Data = ArrayBuffer

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册读取 Characteristic 数据到达回调函数
   * @en Register to read Characteristic data to the callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnCharaValueArrived } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnCharaValueArrived(
    callback: mstOnCharaValueArrived.Callback,
  ): mstOnCharaValueArrived.Result
  namespace mstOnCharaWriteComplete {
    /**
     * @zh 写入 Characteristic 数据完成回调函数
     * @en Write Characteristic Data Completion Callback Function
     */
    type Callback = (profile: Profile, uuid: UUID, status: Status) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册写入 Characteristic 数据完成回调函数
   * @en Register the Write Characteristic data completion callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnCharaWriteComplete } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnCharaWriteComplete(
    callback: mstOnCharaWriteComplete.Callback,
  ): mstOnCharaWriteComplete.Result
  namespace mstOnDescValueArrived {
    /**
     * @zh 读取 Descriptor 数据到达回调函数
     * @en Read Descriptor data to the callback function
     */
    type Callback = (
      profile: Profile,
      uuid: UUID,
      descUUID: DescUUID,
      data: Data,
      status: Status,
    ) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh Descriptor UUID 字符串
     * @en Descriptor UUID string
     */
    type DescUUID = string

    /**
     * @zh 读取到的数据，使用 Uint8Array 视图读取
     * @en Reads the data using the Uint8Array view
     */
    type Data = ArrayBuffer

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册读取 Descriptor 数据到达回调函数
   * @en Register the Read Descriptor data arrival callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnDescValueArrived } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnDescValueArrived(
    callback: mstOnDescValueArrived.Callback,
  ): mstOnDescValueArrived.Result
  namespace mstOnDescWriteComplete {
    /**
     * @zh Descriptor 数据写入完成回调函数
     * @en Descriptor Data write completion callback function
     */
    type Callback = (profile: Profile, uuid: UUID, descUUID: DescUUID, status: Status) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh Descriptor UUID 字符串
     * @en Descriptor UUID string
     */
    type DescUUID = string

    /**
     * @zh 状态，`0` 表示成功
     * @en Status, `0` indicates success
     */
    type Status = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 Descriptor 数据写入完成回调函数
   * @en Register Descriptor data write completion callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnDescWriteComplete } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnDescWriteComplete(
    callback: mstOnDescWriteComplete.Callback,
  ): mstOnDescWriteComplete.Result
  namespace mstOnCharaNotification {
    /**
     * @zh Characteristic Notification 到达回调函数
     * @en Characteristic Notification arrives at the callback function
     */
    type Callback = (profile: Profile, uuid: UUID, data: Data, length: Length) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh 读取到的数据，使用 Uint8Array 视图读取
     * @en It is recommended to use the Uint8Array view to read the data
     */
    type Data = ArrayBuffer

    /**
     * @zh 数据长度
     * @en Data length
     */
    type Length = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 Characteristic Notification 到达回调函数
   * @en Register Characteristic Notification to reach the callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnCharaNotification } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnCharaNotification(
    callback: mstOnCharaNotification.Callback,
  ): mstOnCharaNotification.Result
  namespace mstOnServiceChangeBegin {
    /**
     * @zh Service 开始变更回调函数
     * @en Service start change callback function
     */
    type Callback = (profile: Profile) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 Service 开始变更回调函数
   * @en Register the Service start change callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnServiceChangeBegin } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnServiceChangeBegin(
    callback: mstOnServiceChangeBegin.Callback,
  ): mstOnServiceChangeBegin.Result
  namespace mstOnServiceChangeEnd {
    /**
     * @zh Service 变更结束回调函数
     * @en Service change end callback function
     */
    type Callback = (profile: Profile) => void

    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 Service 变更结束回调函数
   * @en Register the Service change end callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnServiceChangeEnd } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstOnServiceChangeEnd(
    callback: mstOnServiceChangeEnd.Callback,
  ): mstOnServiceChangeEnd.Result
  /**
   * @zh 注销所有注册的蓝牙相关回调函数
   * @en Unregister of all registered Bluetooth-related callback functions
   * @version 3.0
   * @example
   * ```js
   * import { mstOffAllCb } from 'zeppos-cross-api/ble'
   *
   * mstOffAllCb()
   * ```
   */
  function mstOffAllCb(): void
  namespace mstPrepare {
    /**
     * @zh `mstBuildProfile` 返回的 `profile` 指针
     * @en The `profile` pointer returned by `mstBuildProfile`
     */
    type Profile = number
  }

  /**
   * @zh prepare 接口
   * @en prepare interface
   * @version 3.0
   * @example
   * ```js
   * import { mstPrepare } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstPrepare(profile: mstPrepare.Profile): void
  namespace mstReadCharacteristic {
    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string
  }

  /**
   * @zh 读 Characteristic 信息
   * @en Read Characteristic information
   * @version 3.0
   * @example
   * ```js
   * import { mstReadCharacteristic } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstReadCharacteristic(
    profile: mstReadCharacteristic.Profile,
    uuid: mstReadCharacteristic.UUID,
  ): void
  namespace mstWriteCharacteristic {
    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh 读取到的数据，使用 Uint8Array 视图读取
     * @en Reads the data using the Uint8Array view
     */
    type Data = ArrayBuffer

    /**
     * @zh 数据长度
     * @en Data length
     */
    type Length = number
  }

  /**
   * @zh 写 Characteristic 信息
   * @en Write Characteristic information
   * @version 3.0
   * @example
   * ```js
   * import { mstWriteCharacteristic } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstWriteCharacteristic(
    profile: mstWriteCharacteristic.Profile,
    uuid: mstWriteCharacteristic.UUID,
    data: mstWriteCharacteristic.Data,
    length: mstWriteCharacteristic.Length,
  ): void
  namespace mstReadDescriptor {
    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh Descriptor UUID 字符串
     * @en Descriptor UUID string
     */
    type DescUUID = string
  }

  /**
   * @zh 写 characteristic 信息
   * @en Write characteristic information
   * @version 3.0
   * @example
   * ```js
   * import { mstReadDescriptor } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstReadDescriptor(
    profile: mstReadDescriptor.Profile,
    uuid: mstReadDescriptor.UUID,
    descUUID: mstReadDescriptor.DescUUID,
  ): void
  namespace mstWriteDescriptor {
    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number

    /**
     * @zh Characteristic UUID 字符串
     * @en Characteristic UUID string
     */
    type UUID = string

    /**
     * @zh Descriptor UUID 字符串
     * @en Descriptor UUID string
     */
    type DescUUID = string

    /**
     * @zh 读取到的数据，使用 Uint8Array 视图读取
     * @en Reads the data using the Uint8Array view
     */
    type Data = ArrayBuffer

    /**
     * @zh 数据长度
     * @en Data length
     */
    type Length = number

    /**
     * @zh 函数调用结果，`true` 表示成功、`false` 表示失败
     * @en The result of the function call, `true` means success, `false` means failure
     */
    type Result = boolean
  }

  /**
   * @zh 注册 Characteristic notification 到达回调函数
   * @en Register the Characteristic notification arrival callback function
   * @version 3.0
   * @example
   * ```js
   * import { mstOnCharaNotification } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstWriteDescriptor(
    profile: mstWriteDescriptor.Profile,
    uuid: mstWriteDescriptor.UUID,
    descUUID: mstWriteDescriptor.DescUUID,
    data: mstWriteDescriptor.Data,
    length: mstWriteDescriptor.Length,
  ): mstWriteDescriptor.Result
  namespace mstDestroyProfileInstance {
    /**
     * @zh Profile 指针
     * @en Profile pointer
     */
    type Profile = number
  }

  /**
   * @zh 销毁 Profile
   * @en Destroy Profile
   * @version 3.0
   * @example
   * ```js
   * import { mstDestroyProfileInstance } from 'zeppos-cross-api/ble'
   *
   * mstDestroyProfileInstance()
   * ```
   */
  function mstDestroyProfileInstance(profile: mstDestroyProfileInstance.Profile): void
  namespace mstGetProfileInstance {
    /**
     * @zh Profile 名称
     * @en Profile name
     */
    type ProfileName = string

    /**
     * @zh 连接成功时返回的 ID
     * @en The ID returned on a successful connection
     */
    type ConnectId = number

    /**
     * @zh 查找成功返回 Profile 指针，失败返回 `undefined`
     * @en A successful search returns the Profile pointer, a failed search returns `undefined`
     */
    type Result = number | undefined
  }

  /**
   * @zh 销毁 Profile
   * @en Destroy Profile
   * @version 3.0
   * @example
   * ```js
   * import { mstGetProfileInstance } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function mstGetProfileInstance(
    profileName: mstGetProfileInstance.ProfileName,
    connectId: mstGetProfileInstance.ConnectId,
  ): mstGetProfileInstance.Result
  namespace createConnect {
    /**
     * @zh 连接回调函数，`index` 分包号、`data` 数据、`size` 数据长度
     * @en Connection callback function, `index` packet number, `data` data, `size` data length
     */
    type Callback = (index?: number, data?: object, size?: number) => void
  }

  /**
   * @zh 创建连接
   * @en Create connection
   * @example
   * ```js
   * import { createConnect } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function createConnect(callback: createConnect.Callback): void
  /**
   * @zh 断开连接
   * @en Disconnect
   * @example
   * ```js
   * import { disConnect } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function disConnect(): void
  /**
   * @zh 发送消息，`data` 待发送数据，`size` 待发送数据长度
   * @en Send message, `data` data to be sent, `size` length of data to be sent
   * @example
   * ```js
   * import { send } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function send(data: object, size: number): void
  /**
   * @zh 查询连接状态，`true` 表示连接，`false` 表示未连接
   * @en Query connection status, `true` means connected, `false` means not connected
   * @example
   * ```js
   * import { connectStatus } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function connectStatus(): boolean
  namespace addListener {
    /**
     * @zh 连接回调函数，`status` 连接状态
     * @en Connection callback function, `status` Connection status
     */
    type Callback = (status?: boolean) => void
  }

  /**
   * @zh 注册连接状态监听回调函数
   * @en Registering connection status listening callback function
   * @example
   * ```js
   * import { addListener } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function addListener(callback: addListener.Callback): void
  /**
   * @zh 取消连接状态监听回调函数
   * @en Cancel connection status listening callback function
   * @example
   * ```js
   * import { removeListener } from 'zeppos-cross-api/ble'
   *
   * // ...
   * ```
   */
  function removeListener(): void}

/**
  * @zh 设备
  * @en Device
  */
declare module 'zeppos-cross-api/device' {

  /**
   * @zh 方形屏幕
   * @en Square Screen
   */
  const SCREEN_SHAPE_SQUARE: number
  /**
   * @zh 圆形屏幕
   * @en Round Screen
   */
  const SCREEN_SHAPE_ROUND: number
  namespace getDiskInfo {
    /**
     * @output
     */
    interface Result {
      /**
       * @zh 总空间（字节）
       * @en Total Space in bytes
       */
      total: number
      /**
       * @zh 可用空间（字节）
       * @en Available Space in bytes
       */
      free: number
      /**
       * @zh 小程序占用空间（字节）
       * @en Space occupied by Mini Programs in bytes
       */
      app: number
      /**
       * @zh 表盘占用空间（字节）
       * @en Space occupied by watchfaces in bytes
       */
      watchface: number
      /**
       * @zh 音乐占用空间（字节）
       * @en Space occupied by musics in bytes
       */
      music: number
      /**
       * @zh 系统占用空间（字节）
       * @en Space occupied by system in bytes
       */
      system: number
    }
  }

  /**
   * @zh 获取磁盘信息
   * @en Gets disk information
   * @example
   * ```js
   * import { getDiskInfo } from 'zeppos-cross-api/device'
   *
   * const { total } = getDiskInfo()
   * console.log(total)
   * ```
   */
  function getDiskInfo(): getDiskInfo.Result
  namespace getDeviceInfo {
    /**
     * @output
     */
    interface Result {
      /**
       * @zh 设备屏幕宽度
       * @en Device screen width
       */
      width: number
      /**
       * @zh 设备屏幕高度
       * @en Device screen height
       */
      height: number
      /**
       * @zh 屏幕形状，值参考屏幕形状常量
       * @en Screen shape, value refer to screen shape constants
       */
      screenShape: number
      /**
       * @zh 设备名称
       * @en Device name
       */
      deviceName: string
      /**
       * @zh 按键数目
       * @en Number of keys
       */
      keyNumber: number
      /**
       * @zh 设备纯数字代号
       * @en Device Plain Numeric Designators
       */
      deviceSource: number
      /**
       * @zh 设备实体按键类型
       * @en Device physical button type
       */
      keyType: string
      /**
       * @zh 设备颜色标识
       * @en Device color identification
       */
      deviceColor: number
    }
  }

  /**
   * @zh 获取设备信息
   * @en Gets device information
   * @constants screenShape
   * @permissionCode data:os.device.info
   * @example
   * ```js
   * import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from 'zeppos-cross-api/device'
   *
   * const { width, screenShape } = getDeviceInfo()
   * console.log(width)
   *
   * if (screenShape === SCREEN_SHAPE_SQUARE) {
   *   console.log('Square Screen')
   * }
   * ```
   */
  function getDeviceInfo(): getDeviceInfo.Result}

/**
  * @zh 屏幕显示
  * @en Display
  */
declare module 'zeppos-cross-api/display' {

  namespace setWakeUpRelaunch {
    /**
     * @zh 如果类型为 `boolean` 参数含义为 `relaunch`，否则代表 Options 对象
     * @en `true` - auto-brightness is set to on, `false` - auto-brightness is set to off
     */
    type Option = Options | boolean

    interface Options {
      /**
       * @zh 息屏后再次唤醒手表是否重新打开小程序
       * @en Whether to reopen the Mini Program after waking up the watch again after a screen break
       */
      relaunch: boolean
    }
  }

  /**
   * @zh 默认情况下，在小程序某个页面中触发系统息屏，10s 后系统会退出该小程序，再次唤醒手表时进入表盘页面，如果设置 `relaunch` 为 `true`，再次唤醒手表后会重新打开小程序，并进入对应页面
   * @en By default, the system will off the screen in one page of the Mini Program, and the system will exit the Mini Program after 10s, and enter the dial page when the watch is woken up again. If `relaunch` is set to `true`, the Mini Program will reopen and enter the corresponding page when the watch is woken up again.
   * @example
   * ```js
   * import { setWakeUpRelaunch } from 'zeppos-cross-api/display'
   *
   * setWakeUpRelaunch({
   *   relaunch: true
   * })
   * ```
   */
  function setWakeUpRelaunch(option: setWakeUpRelaunch.Option): void
  function setWakeUpRelaunch(relaunch: boolean): void
  namespace setAutoBrightness {
    interface Option {
      /**
       * @zh 是否开启自动亮度
       * @en Whether to open the automatic brightness
       */
      autoBright: boolean
    }
  }

  /**
   * @zh 设置是否开启自动亮度，如果开启，则屏幕亮度由光线传感器控制，`setBrightness` 的设置会失效
   * @en Set whether to turn on auto-brightness, if it is on, then the screen brightness will be controlled by the light sensor and the `setBrightness` will be disabled
   * @example
   * ```js
   * import { setAutoBrightness } from 'zeppos-cross-api/display'
   *
   * setAutoBrightness({
   *   autoBright: true
   * })
   * ```
   */
  function setAutoBrightness(option: setAutoBrightness.Option): void
  function setAutoBrightness(autoBright: boolean): void
  namespace getAutoBrightness {
    /**
     * @zh `true` - 自动亮度设置为开启状态，`false` - 自动亮度设置为关闭状态
     * @en `true` - auto-brightness is set to on, `false` - auto-brightness is set to off
     */
    type Result = boolean
  }

  /**
   * @zh 获取是否开启屏幕自动亮度设置
   * @en Get whether to turn on the screen auto brightness setting
   * @example
   * ```js
   * import { getAutoBrightness } from 'zeppos-cross-api/display'
   *
   * const result = getAutoBrightness()
   *
   * if (result) {
   *   console.log('Auto brightness setting is turned on')
   * }
   * ```
   */
  function getAutoBrightness(): getAutoBrightness.Result
  namespace setBrightness {
    interface Option {
      /**
       * @zh 屏幕亮度数值，范围 0 - 100
       * @en Screen brightness value, range 0 - 100
       */
      brightness: number
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 设置当前设备的屏幕亮度。如果当前开启了自动亮度设置，亮度由光线传感器自动调节，此时调用 `setBrightness` 不会生效，需要使用 `setAutoBrightness` 关闭自动亮度后再进行设置。注意事项：如果退出当前页面，需要考虑是否需要设置回原来的亮度
   * @en Set the screen brightness of the current device. If the auto brightness setting is currently turned on, the brightness is automatically adjusted by the light sensor, calling `setBrightness` will not take effect at this time, you need to use `setAutoBrightness` to turn off the auto brightness and then set it again. Note: If you exit the current page, you need to consider whether you need to set the brightness back to the original brightness
   * @example
   * ```js
   * import { setBrightness } from 'zeppos-cross-api/display'
   *
   * const result = setBrightness({
   *   brightness: 50
   * })
   *
   * if (result === 0) {
   *   console.log('setBrightness success')
   * }
   * ```
   */
  function setBrightness(option: setBrightness.Option): setBrightness.Result
  function setBrightness(brightness: number): setBrightness.Result
  namespace getBrightness {
    /**
     * @zh 屏幕亮度数值，范围 0 - 100
     * @en Screen brightness value, range 0 - 100
     */
    type Result = number
  }

  /**
   * @zh 获取当前设备的屏幕亮度
   * @en Get the screen brightness of the current device
   * @example
   * ```js
   * import { getBrightness } from 'zeppos-cross-api/display'
   *
   * const result = getBrightness()
   * console.log(`current brightness ${result}`)
   * ```
   */
  function getBrightness(): getBrightness.Result
  namespace setScreenOff {
    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 设置屏幕息屏
   * @en Set the screen to rest
   * @example
   * ```js
   * import { setScreenOff } from 'zeppos-cross-api/display'
   *
   * const result = setScreenOff()
   *
   * if (result === 0) {
   *   console.log('setScreenOff success')
   * }
   * ```
   */
  function setScreenOff(): setScreenOff.Result
  namespace setPageBrightTime {
    interface Option {
      /**
       * @zh 亮屏时间（毫秒），范围 [1000 - 2147483000]
       * @en Screen brightness value, range 0 - 100
       * @defaultValue 10000
       */
      brightTime?: number
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 设置当前页面屏幕亮屏时间，这个设置随页面销毁会做重置
   * @en Set the current page screen lighting time, this setting will follow the page destruction to do reset
   * @example
   * ```js
   * import { setPageBrightTime } from 'zeppos-cross-api/display'
   *
   * const result = setPageBrightTime({
   *   brightTime: 60000
   * })
   *
   * if (result === 0) {
   *   console.log('setPageBrightTime success')
   * }
   * ```
   */
  function setPageBrightTime(option: setPageBrightTime.Option): setPageBrightTime.Result
  namespace resetPageBrightTime {
    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 取消 `setPageBrightTime` 设置的亮屏时间
   * @en Cancel the bright time set by `setPageBrightTime`
   * @example
   * ```js
   * import { setPageBrightTime, resetPageBrightTime } from 'zeppos-cross-api/display'
   *
   * setPageBrightTime({
   *   brightTime: 60000
   * })
   *
   * const result = resetPageBrightTime()
   * ```
   */
  function resetPageBrightTime(): resetPageBrightTime.Result
  namespace pausePalmScreenOff {
    interface Option {
      /**
       * @zh 持续时间（毫秒），如果传 `0`，则一直暂停覆掌息屏行为，直到调用 `resetPalmScreenOff`
       * @en Duration (milliseconds), if `0` is passed, the palm rest behavior is suspended until `resetPalmScreenOff` is called
       * @defaultValue 30000
       */
      duration?: number
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 暂停覆掌息屏行为
   * @en Suspension of overlapping palm resting screen behavior
   * @version 2.1
   * @example
   * ```js
   * import { pausePalmScreenOff } from 'zeppos-cross-api/display'
   *
   * pausePalmScreenOff({
   *   duration: 60000
   * })
   * ```
   */
  function pausePalmScreenOff(option: pausePalmScreenOff.Option): pausePalmScreenOff.Result
  namespace resetPalmScreenOff {
    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 恢复覆掌息屏行为
   * @en Recovery of overlapping palm resting screen behavior
   * @version 2.1
   * @example
   * ```js
   * import { pausePalmScreenOff, resetPalmScreenOff } from 'zeppos-cross-api/display'
   *
   * pausePalmScreenOff({
   *   duration: 0
   * })
   *
   * setTimeout(() => {
   *   resetPalmScreenOff()
   * }, 3000)
   * ```
   */
  function resetPalmScreenOff(): resetPalmScreenOff.Result
  namespace pauseDropWristScreenOff {
    interface Option {
      /**
       * @zh 持续时间（毫秒），如果传 `0`，则一直暂停落腕息屏行为，直到调用 `resetPalmScreenOff`
       * @en Duration (milliseconds), if `0` is passed, the wrist rest behavior will be suspended until `resetPalmScreenOff` is called
       * @defaultValue 30000
       */
      duration?: number
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 暂停落腕息屏行为
   * @en Suspension of wrist resting behavior
   * @version 2.1
   * @example
   * ```js
   * import { pauseDropWristScreenOff } from 'zeppos-cross-api/display'
   *
   * pauseDropWristScreenOff({
   *   duration: 60000
   * })
   * ```
   */
  function pauseDropWristScreenOff(
    option: pauseDropWristScreenOff.Option,
  ): pauseDropWristScreenOff.Result
  namespace resetDropWristScreenOff {
    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 恢复落腕息屏行为
   * @en Resume wrist drop resting behavior
   * @version 2.1
   * @example
   * ```js
   * import { pauseDropWristScreenOff, resetDropWristScreenOff } from 'zeppos-cross-api/display'
   *
   * pauseDropWristScreenOff({
   *   duration: 0
   * })
   *
   * setTimeout(() => {
   *   resetDropWristScreenOff()
   * }, 3000)
   * ```
   */
  function resetDropWristScreenOff(): resetDropWristScreenOff.Result
  namespace getSettings {
    /**
     * output
     */
    interface Result {
      /**
       * @zh 屏幕状态
       * @en Screen Status
       */
      screen: ScreenObj
      /**
       * @zh 抬腕亮屏设置
       * @en Lift wrist to view info setting
       */
      wrist: WristObj
      /**
       * @zh 息屏显示设置
       * @en Rest screen display settings
       */
      standby: StandbyObj
    }

    /**
     * output
     */
    interface ScreenObj {
      /**
       * @zh 当前屏幕状态，`1`: 亮屏、`2`: 息屏
       * @en Current screen status, `1`: On, `2`: Off
       */
      status: number
      /**
       * @zh 屏幕亮屏时长，单位秒
       * @en Screen light-up time, in seconds
       */
      duration: number
    }

    interface WristObj {
      /**
       * @zh 抬腕亮屏响应速度
       * @en Response speed
       */
      speed: number
      /**
       * @zh 抬腕亮屏开启模式，值见 `model`
       * @en Mode, see `model` for value
       */
      model: number
      /**
       * @zh 抬腕亮屏开启时间，基于当天 0 点的分钟数
       * @en Start time, based on the number of minutes at 0:00 of the day
       */
      startTime: number
      /**
       * @zh 抬腕亮屏结束时间，基于当天 0 点的分钟数
       * @en End time, based on the number of minutes at 0:00 of the day
       */
      endTime: number
    }

    interface StandbyObj {
      /**
       * @zh 息屏表盘样式，`0`: 系统默认、`1`: 跟随当前表盘
       * @en Rest screen Watchface style, `0`: system default, `1`: follow the current dial
       */
      style: number
      /**
       * @zh 息屏显示开启模式，值见 model
       * @en Mode, see `model` for value
       */
      model: number
      /**
       * @zh 息屏显示开启时间，基于当天 0 点的分钟数
       * @en Start time, based on the number of minutes at 0:00 of the day
       */
      startTime: number
      /**
       * @zh 息屏显示结束时间，基于当天 0 点的分钟数
       * @en End time, based on the number of minutes at 0:00 of the day
       */
      endTime: number
    }

    /**
     * @output
     * @enum
     */
    interface mode {
      /**
       * @zh 关闭
       * @en Measurement invalid
       */
      0: number
      /**
       * @zh 定时开启
       * @en Measurement invalid
       */
      1: number
      /**
       * @zh 全天开启
       * @en Measurement invalid
       */
      2: number
      /**
       * @zh 智能开启
       * @en Measurement invalid
       */
      3: number
    }
  }

  /**
   * @zh 获取系统显示相关信息
   * @en Get system display related information
   * @version 3.0
   * @example
   * ```js
   * import { getSettings } from 'zeppos-cross-api/display'
   *
   * console.log(getSettings())
   * ```
   */
  function getSettings(): getSettings.Result}

/**
  * @zh 文件系统
  * @en File System
  */
declare module 'zeppos-cross-api/fs' {

  /**
   * @zh 指示打开文件以进行只读访问的标志
   * @en Flag indicating to open a file for read-only access
   */
  const O_RDONLY: number
  /**
   * @zh 指示打开文件以进行只写访问的标志
   * @en Flag indicating to open a file for write-only access
   */
  const O_WRONLY: number
  /**
   * @zh 指示打开文件以进行读写访问的标志
   * @en Flag indicating to open a file for read-write access
   */
  const O_RDWR: number
  /**
   * @zh 指示数据将追加到文件末尾的标志
   * @en Flag indicating that data will be appended to the end of the file
   */
  const O_APPEND: number
  /**
   * @zh 如果文件不存在则指示创建文件的标志
   * @en Flag indicating to create the file if it does not already exist
   */
  const O_CREAT: number
  /**
   * @zh 如果设置了 `O_CREAT` 标志并且文件已经存在，则指示打开文件应该失败的标志
   * @en Flag indicating that opening a file should fail if the `O_CREAT` flag is set and the file already exists
   */
  const O_EXCL: number
  /**
   * @zh 标志表示如果文件存在并且该文件被成功打开以进行写访问，则其长度应被截断为零
   * @en Flag indicating that if the file exists and the file is opened successfully for write access, its length shall be truncated to zero
   */
  const O_TRUNC: number
  namespace openSync {
    interface Option {
      /**
       * @zh 文件路径
       * @en path
       */
      path: string
      /**
       * @zh 值参考文件打开的常量
       * @en Value refer to file open constants
       * @defaultValue O_RDONLY
       */
      flag?: number
    }

    /**
     * @zh 文件句柄
     * @en The numeric file descriptor
     */
    type Result = number
  }

  /**
   * @zh 同步地打开小程序 `/data` 目录下的文件，获取文件句柄
   * @en Open the file in the `/data` directory of the Mini Program synchronously and get the file handle
   * @constants open
   * @example
   * ```js
   * import { openSync, O_RDONLY } from 'zeppos-cross-api/fs'
   *
   * const fd = openSync({
   *   path: 'test.txt',
   *   flag: O_RDONLY
   * })
   * ```
   */
  function openSync(option: openSync.Option): openSync.Result
  namespace openAssetsSync {
    interface Option {
      /**
       * @zh 文件路径
       * @en path
       */
      path: string
      /**
       * @zh 值参考文件打开的常量
       * @en Value refer to file open constants
       * @defaultValue O_RDONLY
       */
      flag?: number
    }

    /**
     * @zh 文件句柄
     * @en The numeric file descriptor
     */
    type Result = number
  }

  /**
   * @zh 同步地打开小程序 `/assets` 目录下的文件，获取文件句柄
   * @en Open the file in the `/assets` directory of the Mini Program synchronously and get the file handle
   * @constants open
   * @example
   * ```js
   * import { openSync, O_RDONLY } from 'zeppos-cross-api/fs'
   *
   * const fd = openAssetsSync({
   *   path: 'test.txt',
   *   flag: O_RDONLY
   * })
   * ```
   */
  function openAssetsSync(option: openAssetsSync.Option): openAssetsSync.Result
  namespace statSync {
    interface Option {
      /**
       * @zh 路径
       * @en path
       */
      path: string
    }

    /**
     * @zh 如果返回 `undefined` 则目标文件不存在，否则返回文件信息对象
     * @en If `undefined` is returned, the target file does not exist, otherwise the file information object is returned
     */
    type Result = FSStat | undefined

    /**
     * @output
     */
    interface FSStat {
      /**
       * @zh 文件大小（单位为字节）
       * @en The size of the file in bytes
       */
      size: number
    }
  }

  /**
   * @zh 同步地获取小程序 `/data` 目录下的文件信息
   * @en Get information about the files in the `/data` directory of the Mini Program synchronously
   * @example
   * ```js
   * import { statSync } from 'zeppos-cross-api/fs'
   *
   * const result = statSync({
   *   path: 'test.txt',
   * })
   *
   * if (result) {
   *   const { size } = result
   *   console.log(size)
   * }
   * ```
   */
  function statSync(option: statSync.Option): statSync.Result
  namespace statAssetsSync {
    interface Option {
      /**
       * @zh 路径
       * @en path
       */
      path: string
    }

    /**
     * @zh 如果返回 `undefined` 则目标文件不存在，否则返回文件信息对象
     * @en If `undefined` is returned, the target file does not exist, otherwise the file information object is returned
     */
    type Result = FSStat | undefined

    /**
     * @output
     */
    interface FSStat {
      /**
       * @zh 文件大小（单位为字节）
       * @en The size of the file in bytes
       */
      size: number
    }
  }

  /**
   * @zh 同步地获取小程序 `/assets` 目录下的文件信息
   * @en Synchronously gets information about the files in the Mini Program `/assets` directory
   * @example
   * ```js
   * import { statAssetsSync } from 'zeppos-cross-api/fs'
   *
   * const result = statAssetsSync({
   *   path: 'test.txt',
   * })
   *
   * if (result) {
   *   const { size } = result
   *   console.log(size)
   * }
   * ```
   */
  function statAssetsSync(option: statAssetsSync.Option): statAssetsSync.Result
  namespace closeSync {
    interface Option {
      /**
       * @zh 文件句柄，由 `openSync`、`openAssetsSync` 等 API 返回
       * @en File handle, returned by the `openSync`, `openAssetsSync` and other APIs
       */
      fd: number
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 同步地关闭文件句柄
   * @en Close the file handle synchronously
   * @example
   * ```js
   * import { openSync, closeSync, O_RDONLY } from 'zeppos-cross-api/fs'
   *
   * const fd = openSync({
   *   path: 'test.txt',
   *   flag: O_RDONLY
   * })
   * const result = closeSync({
   *   fd
   * })
   *
   * if (result === 0) {
   *   console.log('file descriptor closed')
   * }
   * ```
   */
  function closeSync(option: closeSync.Option): closeSync.Result
  function closeSync(fd: number): closeSync.Result
  namespace readSync {
    interface Option {
      /**
       * @zh 文件句柄，由 `openSync`、`openAssetsSync` 等 API 返回
       * @en File handle, returned by the `openSync`, `openAssetsSync` and other APIs
       */
      fd: number
      /**
       * @zh 数据将写入的 ArrayBuffer
       * @en The ArrayBuffer that the data will be written to
       */
      buffer: ArrayBuffer
      /**
       * @zh 其他选项
       * @en Other Options
       */
      options?: Options
    }

    interface Options {
      /**
       * @zh 要写入数据的 buffer 中的位置
       * @en The position in buffer to write the data to
       * @defaultValue 0
       */
      offset?: number
      /**
       * @zh 读取的字节数，默认为传入 buffer 的字节长度
       * @en The number of bytes to read, the default is the number of bytes passed into the buffer
       * @defaultValue buffer.byteLength
       */
      length?: number
      /**
       * @zh 指定从文件中开始读取的位置，如果 `position` 为 `null`，则将从当前文件位置读取数据，并更新文件位置
       * @en Specifies the position from which to start reading from the file. If `position` is `null`, the data will be read from the current file position and the file position will be updated
       * @defaultValue null
       */
      position?: number | null
    }

    /**
     * @zh 读取的字节数
     * @en The number of bytes read
     */
    type Result = number
  }

  /**
   * @zh 同步地从文件句柄指定的文件中读取内容，将内容读取到给定 `ArrayBuffer` 中
   * @en Synchronously reads the content from the file specified by the file handle into the given `ArrayBuffer`.
   * @example
   * ```js
   * import { openSync, readSync, O_RDONLY } from 'zeppos-cross-api/fs'
   *
   * const fd = openSync({
   *   path: 'test.txt',
   *   flag: O_RDONLY
   * })
   *
   * const buffer = new ArrayBuffer(4)
   * const result = readSync({
   *   fd,
   *   buffer
   * })
   *
   * if (result === 0) {
   *  console.log('readSync success')
   * }
   * ```
   */
  function readSync(option: readSync.Option): readSync.Result
  namespace writeSync {
    interface Option {
      /**
       * @zh 文件句柄，由 `openSync`、`openAssetsSync` 等 API 返回
       * @en File handle, returned by the `openSync`, `openAssetsSync` and other APIs
       */
      fd: number
      /**
       * @zh 将写入文件的 ArrayBuffer
       * @en The buffer that the data will be written to
       */
      buffer: ArrayBuffer
      /**
       * @zh 其他选项
       * @en Other Options
       */
      options?: Options
    }

    interface Options {
      /**
       * @zh 基于要写入文件的 ArrayBuffer 首地址偏移量
       * @en Based on first address offset in ArrayBuffer to write the data
       * @defaultValue 0
       */
      offset?: number
      /**
       * @zh 写入的字节数，默认为传入 buffer 的字节长度
       * @en The number of bytes to write, the default is the length of the incoming buffer
       * @defaultValue buffer.byteLength
       */
      length?: number
      /**
       * @zh 指定文件中开始写入的位置，表示从文件开头的偏移量。如果 `position` 为 `null`，则从当前文件位置写入数据，并更新文件位置
       * @en Position refers to the offset from the beginning of the file where this data should be written. If position is 'null', the data will be written at the and the file position will be updated
       * @defaultValue null
       */
      position?: number | null
    }

    /**
     * @zh 写入的字节数
     * @en The number of bytes written
     */
    type Result = number
  }

  /**
   * @zh 同步地将 ArrayBuffer 写入文件句柄指定的文件
   * @en Synchronously write ArrayBuffer to the file specified by fd
   * @example
   * ```js
   * import { openSync, writeSync, O_RDWR, O_CREAT } from 'zeppos-cross-api/fs'
   *
   * const fd = openSync({
   *   path: 'test.txt',
   *   flag: O_RDWR | O_CREAT
   * })
   *
   * const buffer = new ArrayBuffer(4)
   * const result = writeSync({
   *   fd,
   *   buffer
   * })
   *
   * if (result === 0) {
   *  console.log('writeSync success')
   * }
   * ```
   */
  function writeSync(option: writeSync.Option): writeSync.Result
  namespace rmSync {
    interface Option {
      /**
       * @zh 文件路径
       * @en path
       */
      path: string
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 同步地删除小程序 `/data` 目录下的文件
   * @en Synchronously delete files in the `/data` directory of the Mini Program
   * @example
   * ```js
   * import { rmSync } from 'zeppos-cross-api/fs'
   *
   * const result = rmSync({
   *   path: 'test.txt',
   * })
   *
   * if (result === 0) {
   *   console.log('rmSync success')
   * }
   * ```
   */
  function rmSync(option: rmSync.Option): rmSync.Result
  function rmSync(path: string): rmSync.Result
  namespace renameSync {
    interface Option {
      /**
       * @zh 旧的文件路径
       * @en Old path
       */
      oldPath: string
      /**
       * @zh 新的文件路径
       * @en New path
       */
      newPath: string
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 重命名小程序 `/data` 目录下的文件，将文件从 `oldPath` 重命名为 `newPath`
   * @en Rename the files in the `/data` directory of the Mini Program, renaming the files from `oldPath` to `newPath`
   * @example
   * ```js
   * import { renameSync } from 'zeppos-cross-api/fs'
   *
   * const result = renameSync({
   *   oldPath: 'test.txt',
   *   newPath: 'new_test.txt'
   * })
   *
   * if (result === 0) {
   *   console.log('renameSync success')
   * }
   * ```
   */
  function renameSync(option: renameSync.Option): renameSync.Result
  namespace mkdirSync {
    interface Option {
      /**
       * @zh 目录路径
       * @en Directory path
       */
      path: string
    }

    /**
     * @zh 如果返回 `0` 则表明成功
     * @en If `0` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 同步地在小程序 `/data` 目录下创建目录
   * @en Synchronously create a directory in the `/data` directory of the Mini Program
   * @example
   * ```js
   * import { mkdirSync } from 'zeppos-cross-api/fs'
   *
   * const result = mkdirSync({
   *   path: 'content',
   * })
   *
   * if (result === 0) {
   *   console.log('mkdirSync success')
   * }
   * ```
   */
  function mkdirSync(option: mkdirSync.Option): mkdirSync.Result
  function mkdirSync(path: string): mkdirSync.Result
  namespace readdirSync {
    interface Option {
      /**
       * @zh 目录路径
       * @en Directory path
       */
      path: string
    }

    /**
     * @zh 如果返回 `undefined` 则目录不存在，否则返回文件名数组
     * @en If `undefined` is returned, the directory does not exist, otherwise an array of filenames is returned
     */
    type Result = Array<string> | undefined
  }

  /**
   * @zh 同步地读取小程序 `/data` 目录下的目录
   * @en Read the directory under the `/data` directory of the Mini Program synchronously
   * @example
   * ```js
   * import { readdirSync } from 'zeppos-cross-api/fs'
   *
   * const result = readdirSync({
   *   path: 'content',
   * })
   *
   * if (result === 0) {
   *   console.log('readdirSync success')
   * }
   * ```
   */
  function readdirSync(option: readdirSync.Option): readdirSync.Result
  namespace readFileSync {
    interface Option1 {
      /**
       * @zh 文件路径
       * @en path
       */
      path: string
    }

    interface Option2 {
      /**
       * @zh 文件路径
       * @en path
       */
      path: string
      /**
       * @zh 其他选项
       * @en Other Options
       */
      options: Options
    }

    interface Options {
      /**
       * @zh 当指定了编码方式之后，API 返回结果为 `string`
       * @en When the encoding method is specified, the API returns `string` as the result
       */
      encoding: string
    }

    /**
     * @zh 文件内容。如果返回 `undefined`，则表明读取文件失败
     * @en File content. If `undefined` is returned, the file failed to be read
     */
    type Result1 = ArrayBuffer | undefined

    type Result2 = string | undefined
  }

  /**
   * @zh 返回小程序 `/data` 目录下指定文件的全部内容
   * @en Returns the entire contents of the specified file in the `/data` directory of the Mini Program
   * @example
   * ```js
   * import { readFileSync } from 'zeppos-cross-api/fs'
   *
   * const contentBuffer = readFileSync({
   *   path: 'test.txt',
   * })
   *
   * const contentString = readFileSync({
   *   path: 'test.txt',
   *   options: {
   *     encoding: 'utf8'
   *   }
   * })
   * ```
   */
  function readFileSync(option: readFileSync.Option1): readFileSync.Result1
  function readFileSync(option: readFileSync.Option2): readFileSync.Result2
  namespace writeFileSync {
    interface Option1 {
      /**
       * @zh 文件路径或者文件句柄
       * @en File path or file descriptor
       */
      path: string | number
      /**
       * @zh 写入目标文件的数据
       * @en Data to be written to the target file
       */
      data: ArrayBuffer | DataView
    }

    interface Option2 {
      /**
       * @zh 文件路径或者文件句柄
       * @en File path or file descriptor
       */
      path: string | number
      /**
       * @zh 写入目标文件的数据
       * @en Data to be written to the target file
       */
      data: string
      /**
       * @zh 其他选项
       * @en Other Options
       */
      options: Options
    }

    interface Options {
      /**
       * @zh 如果数据格式为 `string`，需要指定编码方式
       * @en If the `data` format is `string`, you need to specify the encoding method
       * @defaultValue utf8
       */
      encoding: string
    }
  }

  /**
   * @zh 同步地将数据写入小程序 `/data` 目录下的文件，如果文件已存在则替换文件，不存在则新建文件
   * @en Synchronously write data to a file in the `/data` directory of the Mini Program, replacing the file if it already exists, or creating a new file if it doesn't
   * @example
   * ```js
   * import { writeFileSync } from 'zeppos-cross-api/fs'
   *
   * const buffer = new ArrayBuffer(4)
   * writeFileSync({
   *   path: 'test.txt',
   *   data: buffer
   * })
   *
   * writeFileSync({
   *   path: 'content.txt',
   *   data: 'some content...',
   *   options: {
   *     encoding: 'utf8'
   *   }
   * })
   * ```
   */
  function writeFileSync(option: writeFileSync.Option1): void
  function writeFileSync(option: writeFileSync.Option2): void
}
declare namespace App {
    interface Option {
        /**
         * @zh App 实例上的挂载的数据对象，可用于存储小程序全局状态
         * @en Mounted data objects on App instances that can be used to store the global state of the Mini Program
         */
        globalData?: object;
        /**
         * @zh App onCreate 生命周期函数，如果是通过 router 模块中相关方法打开小程序，并且携带 params 参数，则在 onCreate 方法中可以获取到 params 字符串
         * @en Mounted data objects on App instances that can be used to store the global state of the Mini Program
         */
        onCreate?: (params?: string) => void;
        /**
         * @zh 小程序销毁时触发 `onDestroy` 生命周期函数
         * @en The `onDestroy` lifecycle function is triggered when the Mini Program is destroyed
         */
        onDestroy?: () => void;
    }

    /**
     * @zh App 实例
     * @en App instance
     */
    type Result = unknown;
}

/**
 * @zh 注册小程序，指定小程序的生命周期回调等。`App()` 必须在 `app.js` 中调用，且只能调用一次
 * @en Register the Mini Program, specifying the Mini Program's lifecycle callbacks, etc. `App()` must be called in `app.js`, and can only be called once
 * @example
 * ```js title="app.js"
 * App({
 *   globalData: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onCreate() {
 *     console.log('onCreate')
 *     console.log(this.globalData.text)
 *   },
 *   onDestroy() {
 *     console.log('onDestroy')
 *   }
 * })
 * ```
 */
declare function App(option: App.Option): App.Result;

declare namespace getApp {
    /**
     * @zh App 实例
     * @en App instance
     * @output
     */
    interface Result {
        /**
         * @zh app 实例属性
         * @en app instance property
         */
        _options: Options;
    }

    /**
     * @zh app 实例属性
     * @en app instance property
     * @output
     */
    interface Options {
        /**
         * @zh App 构造函数上传入的其他属性
         * @en Other properties passed in on the App constructor
         */
        [propName: string]: any;
        /**
         * @zh app 实例上的挂载的数据对象
         * @en mounted data objects on app instances
         */
        globalData?: any;
    }
}

/**
 * @zh 获取 app 实例对象
 * @en Get the app instance object
 * @example
 * ```js
 * App({
 *   globalData: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onCreate() {
 *     console.log('onCreate')
 *     console.log(this.globalData.text)
 *   },
 *   onDestroy() {
 *     console.log('onDestroy')
 *   }
 * })
 *
 * const app = getApp()
 * console.log(app._options.globalData.text)
 * ```
 */
declare function getApp(): getApp.Result;

declare namespace Page {
    interface Option {
        /**
         * @zh page 实例上挂载的数据对象，可用于存储当前页面的状态
         * @en A data object mounted on a page instance that can be used to store the state of the current page
         */
        state?: any;
        /**
         * @zh 页面初始化完成时触发，每个页面只触发一次，可以用来初始化 page 状态。如果是通过 router 模块中相关方法打开页面，并且携带 params 参数，则在 onInit 方法中可以获取到 params 字符串
         * @en It is triggered once per page and can be used to initialize the page state. If the page is opened by the relevant method in the router module with params parameters, the params string can be retrieved in the onInit method
         */
        onInit?: (params?: string) => void;
        /**
         * @zh 在 `onInit` 执行完成后触发，推荐在 `build` 生命周期中进行 UI 绘制
         * @en Triggered after `onInit` execution completes, recommended for UI drawing in the `build` lifecycle
         */
        build?: (params?: string) => void;
        /**
         * @zh 页面销毁时触发 `onDestroy` 生命周期函数
         * @en The `onDestroy` lifecycle function is triggered when the page is destroyed
         */
        onDestroy?: () => void;
        [key: string]: any;
    }

    /**
     * @zh Page 实例
     * @en Page instance
     */
    type Result = unknown;
}

/**
 * @zh 注册小程序中的一个页面，指定当前页面的生命周期回调等。每个页面文件都必须调用 `Page()` 构造函数且只能调用一次
 * @en Register a page in the Mini Program, specify the lifecycle callback for the current page, etc. Each page file must call the `Page()` constructor only once
 * @example
 * ```js title="page.js"
 * Page({
 *   state: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onInit() {
 *     console.log('onInit')
 *   },
 *   build() {
 *     console.log('build')
 *     console.log(this.state.text)
 *   }
 * })
 * ```
 */
declare function Page(option: Page.Option): Page.Result;

declare namespace SecondaryWidget {
    interface Option {
        /**
         * @zh SecondaryWidget 副屏应用实例上挂载的数据对象，可用于存储状态
         * @en A data object mounted on a SecondaryWidget instance that can be used to store the state of the current SecondaryWidget
         */
        state?: object;
        /**
         * @zh 初始化完成时触发，只触发一次，可以用来初始化 SecondaryWidget 状态
         * @en It is triggered once per SecondaryWidget and can be used to initialize the SecondaryWidget state
         */
        onInit?: (params?: string) => void;
        /**
         * @zh 在 `onInit` 执行完成后触发，推荐在 `build` 生命周期中进行 UI 绘制
         * @en Triggered after `onInit` execution completes, recommended for UI drawing in the `build` lifecycle
         */
        build?: (params?: string) => void;
        /**
         * @zh 当屏幕焦点聚焦在此副屏应用上时触发
         * @en Triggered when the screen focus is on this SecondaryWidget
         */
        onResume?: () => void;
        /**
         * @zh 当屏幕焦点离开此副屏应用上时触发
         * @en Triggered when the screen focus leaves this SecondaryWidget
         */
        onPause?: () => void;
        /**
         * @zh 销毁时触发 `onDestroy` 生命周期函数
         * @en The `onDestroy` lifecycle function is triggered when the SecondaryWidget is destroyed
         */
        onDestroy?: () => void;
    }

    /**
     * @zh SecondaryWidget 实例
     * @en SecondaryWidget instance
     */
    type Result = unknown;
}

/**
 * @zh 注册副屏应用，指定当前页面的生命周期回调等。每个副屏应用都必须调用 `SecondaryWidget()` 构造函数且只能调用一次
 * @en Register SecondaryWidget, specify the lifecycle callback for the current SecondaryWidget, etc. Each SecondaryWidget file must call the `SecondaryWidget()` constructor only once
 * @example
 * ```js title="secondaryWidget.js"
 * SecondaryWidget({
 *   state: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onInit() {
 *     console.log('onInit')
 *   },
 *   build() {
 *     console.log('build')
 *     console.log(this.state.text)
 *   }
 * })
 * ```
 */
declare function SecondaryWidget(option: SecondaryWidget.Option): SecondaryWidget.Result;

declare namespace AppWidget {
    interface Option {
        /**
         * @zh AppWidget 快捷卡片实例上挂载的数据对象，可用于存储状态
         * @en A data object mounted on a AppWidget instance that can be used to store the state of the current AppWidget
         */
        state?: object;
        /**
         * @zh 初始化完成时触发，只触发一次，可以用来初始化 AppWidget 状态
         * @en It is triggered once per AppWidget and can be used to initialize the AppWidget state
         */
        onInit?: (params?: string) => void;
        /**
         * @zh 在 `onInit` 执行完成后触发，推荐在 `build` 生命周期中进行 UI 绘制
         * @en Triggered after `onInit` execution completes, recommended for UI drawing in the `build` lifecycle
         */
        build?: (params?: string) => void;
        /**
         * @zh 当屏幕焦点聚焦在此快捷卡片上时触发
         * @en Triggered when the screen focus is on this AppWidget
         */
        onResume?: () => void;
        /**
         * @zh 当屏幕焦点离开此快捷卡片上时触发
         * @en Triggered when the screen focus leaves this AppWidget
         */
        onPause?: () => void;
        /**
         * @zh 销毁时触发 `onDestroy` 生命周期函数
         * @en The `onDestroy` lifecycle function is triggered when the AppWidget is destroyed
         */
        onDestroy?: () => void;
    }

    /**
     * @zh AppWidget 实例
     * @en AppWidget instance
     */
    type Result = unknown;
}

/**
 * @zh 注册快捷卡片，指定当前页面的生命周期回调等。每个快捷卡片都必须调用 `AppWidget()` 构造函数且只能调用一次
 * @en Register AppWidget, specify the lifecycle callback for the current AppWidget, etc. Each AppWidget file must call the `AppWidget()` constructor only once
 * @example
 * ```js title="appWidget.js"
 * AppWidget({
 *   state: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onInit() {
 *     console.log('onInit')
 *   },
 *   build() {
 *     console.log('build')
 *     console.log(this.state.text)
 *   }
 * })
 * ```
 */
declare function AppWidget(option: AppWidget.Option): AppWidget.Result;

declare namespace AppService {
    interface Option {
        /**
         * @zh appService 实例上挂载的数据对象，可用于存储当前服务的状态
         * @en A data object mounted on the appService instance that can be used to store the current state of the service
         */
        state?: object;
        /**
         * @zh 启动服务的时候触发该函数，如果启动服务携带 params 参数，则在 onInit 方法中可以获取到 params 字符串
         * @en This function is triggered when the service is started. If the service is started with params, the params string can be obtained in the onInit method
         */
        onInit?: (params?: string) => void;
        /**
         * @zh 服务销毁时触发 `onDestroy` 生命周期函数
         * @en The `onDestroy` lifecycle function is triggered when the service is destroyed
         */
        onDestroy?: () => void;
    }

    /**
     * @zh AppService 实例
     * @en AppService instance
     */
    type Result = unknown;
}

/**
 * @zh 注册设备应用服务，指定当前服务的生命周期回调等。每个设备应用服务都必须调用 `AppService()` 构造函数且只能调用一次
 * @en Register a page in the Mini Program, specify the lifecycle callback for the current page, etc. Each page file must call the `Page()` constructor only once
 * @permissionCode device:os.bg_service
 * @version 3.0
 * @example
 * ```js title="appService.js"
 * AppService({
 *   state: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onInit() {
 *     console.log('onInit')
 *   }
 * })
 * ```
 */
declare function AppService(option: AppService.Option): AppService.Result;

declare namespace getCurrentPage {
    /**
     * @zh page 实例
     * @en page instance
     * @output
     */
    interface Result {
        /**
         * @zh page 实例属性
         * @en page instance property
         */
        _options: Options;
    }

    interface Options {
        /**
         * @zh Page 构造函数上传入的其他属性
         * @en Other properties passed in on the Page constructor
         */
        [propName: string]: any;
        /**
         * @zh page 实例上的挂载的数据对象
         * @en mounted data objects on page instances
         */
        state?: object;
    }
}

/**
 * @zh 获取 page 实例对象
 * @en Get the page instance object
 * @example
 * ```js title="page.js"
 * Page({
 *   state: {
 *     text: 'Hello Zepp OS'
 *   },
 *   onInit() {
 *     console.log('onInit')
 *   },
 *   build() {
 *     console.log('build')
 *     console.log(this.state.text)
 *   }
 * })
 *
 * const page = getCurrentPage()
 * console.log(page._options.state.text)
 * ```
 */
declare function getCurrentPage(): getCurrentPage.Result;

/**
 * @zh 控制台打印日志
 * @en Console Print Log
 * @example
 * ```js
 * console.log('Hello Zepp OS')
 * ```
 */
declare interface console {
    /**
     * @zh 打印 log 等级的日志，可传入任意多个参数。每条日志打印长度有限，超出部分会被截断，如需打印完整内容，需要开发者将内容分多次打印
     * @en Print log level logs with any number of parameters. Each log is limited in length and will be truncated if it is exceeded. To print the full content, the developer needs to print the content in multiple times
     */
    log(...data: any[]): void;
}

declare namespace setTimeout {
    /**
     * @zh 定时器到期后执行的回调函数
     * @en Callback functions executed after the timer expires
     */
    type Callback = () => unknown;
    /**
     * @zh 函数延迟的毫秒数，默认 1ms
     * @en The number of milliseconds to delay the function, default 1ms
     */
    type Delay = number;
    /**
     * @zh 定时器的编号
     * @en Timer number
     */
    type TimeoutID = number;
}

/**
 * @zh 设置一个定时器，在定时器到期之后执行注册的回调函数
 * @en Set a timer and execute the registered callback function after the timer expires
 * @example
 * ```js
 * setTimeout(() => {
 *   console.log('Hello Zepp OS')
 * }, 1000)
 * ```
 */
declare function setTimeout(callback: setTimeout.Callback, delay?: setTimeout.Delay): setTimeout.TimeoutID;

declare namespace clearTimeout {
    /**
     * @zh 定时器的编号
     * @en Timer number
     */
    type TimeoutID = number;
}

/**
 * @zh 取消 `setTimeout` 注册的定时器
 * @en Cancel the timer registered by `setTimeout`
 * @example
 * ```js
 * const timeoutID = setTimeout(() => {
 *   console.log('Hello Zepp OS')
 * }, 1000)
 *
 * clearTimeout(timeoutID)
 * ```
 */
declare function clearTimeout(timeoutID: clearTimeout.TimeoutID): void;

declare namespace setInterval {
    /**
     * @zh 重复调用的回调函数
     * @en Repeatedly called callback functions
     */
    type Callback = () => unknown;
    /**
     * @zh 每次调用回调函数的时间间隔
     * @en Time interval between each callback function call
     */
    type Delay = number;
    /**
     * @zh 定时器的编号
     * @en Timer number
     */
    type IntervalID = number;
}

/**
 * @zh 重复调用一个函数，在每次调用之间具有固定的时间间隔
 * @en Repeatedly call a function with a fixed time interval between each call
 * @example
 * ```js
 * setInterval(() => {
 *   console.log('Hello Zepp OS')
 * }, 1000)
 * ```
 */
declare function setInterval(callback: setInterval.Callback, delay: setInterval.Delay): setInterval.IntervalID;

declare namespace clearInterval {
    /**
     * @zh 定时器的编号
     * @en Timer number
     */
    type IntervalID = number;
}

/**
 * @zh 取消 `setInterval` 注册的定时器
 * @en Cancel the timer registered by `setInterval`
 * @example
 * ```js
 * const intervalID = setInterval(() => {
 *   console.log('Hello Zepp OS')
 * }, 1000)
 *
 * clearInterval(intervalID)
 * ```
 */
declare function clearInterval(intervalID: clearInterval.IntervalID): void;
declare class Buffer extends Uint8Array {
  length: number
  write(string: string, offset?: number, length?: number, encoding?: string): number
  toString(encoding?: string, start?: number, end?: number): string
  toJSON(): { type: 'Buffer'; data: any[] }
  equals(otherBuffer: Buffer): boolean
  compare(
    otherBuffer: Uint8Array,
    targetStart?: number,
    targetEnd?: number,
    sourceStart?: number,
    sourceEnd?: number,
  ): number
  copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number
  slice(start?: number, end?: number): Buffer
  writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number
  writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number
  writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number
  writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number
  readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number
  readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number
  readIntLE(offset: number, byteLength: number, noAssert?: boolean): number
  readIntBE(offset: number, byteLength: number, noAssert?: boolean): number
  readUInt8(offset: number, noAssert?: boolean): number
  readUInt16LE(offset: number, noAssert?: boolean): number
  readUInt16BE(offset: number, noAssert?: boolean): number
  readUInt32LE(offset: number, noAssert?: boolean): number
  readUInt32BE(offset: number, noAssert?: boolean): number
  readBigUInt64LE(offset: number): BigInt
  readBigUInt64BE(offset: number): BigInt
  readInt8(offset: number, noAssert?: boolean): number
  readInt16LE(offset: number, noAssert?: boolean): number
  readInt16BE(offset: number, noAssert?: boolean): number
  readInt32LE(offset: number, noAssert?: boolean): number
  readInt32BE(offset: number, noAssert?: boolean): number
  readBigInt64LE(offset: number): BigInt
  readBigInt64BE(offset: number): BigInt
  readFloatLE(offset: number, noAssert?: boolean): number
  readFloatBE(offset: number, noAssert?: boolean): number
  readDoubleLE(offset: number, noAssert?: boolean): number
  readDoubleBE(offset: number, noAssert?: boolean): number
  reverse(): this
  swap16(): Buffer
  swap32(): Buffer
  swap64(): Buffer
  writeUInt8(value: number, offset: number, noAssert?: boolean): number
  writeUInt16LE(value: number, offset: number, noAssert?: boolean): number
  writeUInt16BE(value: number, offset: number, noAssert?: boolean): number
  writeUInt32LE(value: number, offset: number, noAssert?: boolean): number
  writeUInt32BE(value: number, offset: number, noAssert?: boolean): number
  writeBigUInt64LE(value: number, offset: number): BigInt
  writeBigUInt64BE(value: number, offset: number): BigInt
  writeInt8(value: number, offset: number, noAssert?: boolean): number
  writeInt16LE(value: number, offset: number, noAssert?: boolean): number
  writeInt16BE(value: number, offset: number, noAssert?: boolean): number
  writeInt32LE(value: number, offset: number, noAssert?: boolean): number
  writeInt32BE(value: number, offset: number, noAssert?: boolean): number
  writeBigInt64LE(value: number, offset: number): BigInt
  writeBigInt64BE(value: number, offset: number): BigInt
  writeFloatLE(value: number, offset: number, noAssert?: boolean): number
  writeFloatBE(value: number, offset: number, noAssert?: boolean): number
  writeDoubleLE(value: number, offset: number, noAssert?: boolean): number
  writeDoubleBE(value: number, offset: number, noAssert?: boolean): number
  fill(value: any, offset?: number, end?: number): this
  indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number
  lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number
  includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean

  /**
   * Allocates a new buffer containing the given {str}.
   *
   * @param str String to store in buffer.
   * @param encoding encoding to use, optional.  Default is 'utf8'
   */
  constructor(str: string, encoding?: string)
  /**
   * Allocates a new buffer of {size} octets.
   *
   * @param size count of octets to allocate.
   */
  constructor(size: number)
  /**
   * Allocates a new buffer containing the given {array} of octets.
   *
   * @param array The octets to store.
   */
  constructor(array: Uint8Array)
  /**
   * Produces a Buffer backed by the same allocated memory as
   * the given {ArrayBuffer}.
   *
   *
   * @param arrayBuffer The ArrayBuffer with which to share memory.
   */
  constructor(arrayBuffer: ArrayBuffer)
  /**
   * Allocates a new buffer containing the given {array} of octets.
   *
   * @param array The octets to store.
   */
  constructor(array: any[])
  /**
   * Copies the passed {buffer} data onto a new {Buffer} instance.
   *
   * @param buffer The buffer to copy.
   */
  constructor(buffer: Buffer)
  prototype: Buffer
  /**
   * Allocates a new Buffer using an {array} of octets.
   *
   * @param array
   */
  static from(array: any[]): Buffer
  /**
   * When passed a reference to the .buffer property of a TypedArray instance,
   * the newly created Buffer will share the same allocated memory as the TypedArray.
   * The optional {byteOffset} and {length} arguments specify a memory range
   * within the {arrayBuffer} that will be shared by the Buffer.
   *
   * @param arrayBuffer The .buffer property of a TypedArray or a new ArrayBuffer()
   * @param byteOffset
   * @param length
   */
  static from(arrayBuffer: ArrayBuffer, byteOffset?: number, length?: number): Buffer
  /**
   * Copies the passed {buffer} data onto a new Buffer instance.
   *
   * @param buffer
   */
  static from(buffer: Buffer | Uint8Array): Buffer
  /**
   * Creates a new Buffer containing the given JavaScript string {str}.
   * If provided, the {encoding} parameter identifies the character encoding.
   * If not provided, {encoding} defaults to 'utf8'.
   *
   * @param str
   */
  static from(str: string, encoding?: string): Buffer
  /**
   * Returns true if {obj} is a Buffer
   *
   * @param obj object to test.
   */
  static isBuffer(obj: any): obj is Buffer
  /**
   * Returns true if {encoding} is a valid encoding argument.
   * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
   *
   * @param encoding string to test.
   */
  static isEncoding(encoding: string): boolean
  /**
   * Gives the actual byte length of a string. encoding defaults to 'utf8'.
   * This is not the same as String.prototype.length since that returns the number of characters in a string.
   *
   * @param string string to test.
   * @param encoding encoding used to evaluate (defaults to 'utf8')
   */
  static byteLength(string: string, encoding?: string): number
  /**
   * Returns a buffer which is the result of concatenating all the buffers in the list together.
   *
   * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
   * If the list has exactly one item, then the first item of the list is returned.
   * If the list has more than one item, then a new Buffer is created.
   *
   * @param list An array of Buffer objects to concatenate
   * @param totalLength Total length of the buffers when concatenated.
   *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
   */
  static concat(list: Uint8Array[], totalLength?: number): Buffer
  /**
   * The same as buf1.compare(buf2).
   */
  static compare(buf1: Uint8Array, buf2: Uint8Array): number
  /**
   * Allocates a new buffer of {size} octets.
   *
   * @param size count of octets to allocate.
   * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
   *    If parameter is omitted, buffer will be filled with zeros.
   * @param encoding encoding used for call to buf.fill while initializing
   */
  static alloc(size: number, fill?: string | Buffer | number, encoding?: string): Buffer
  /**
   * Allocates a new buffer of {size} octets, leaving memory not initialized, so the contents
   * of the newly created Buffer are unknown and may contain sensitive data.
   *
   * @param size count of octets to allocate
   */
  static allocUnsafe(size: number): Buffer
  /**
   * Allocates a new non-pooled buffer of {size} octets, leaving memory not initialized, so the contents
   * of the newly created Buffer are unknown and may contain sensitive data.
   *
   * @param size count of octets to allocate
   */
  static allocUnsafeSlow(size: number): Buffer
}


/**
  * @zh 国际化
  * @en I18n
  */
declare module 'zeppos-cross-api/i18n' {

  namespace getText {
    /**
     * @zh 国际化 key
     * @en Internationalization key
     */
    type Key = string

    /**
     * @zh 国际化 key 对应的字符串
     * @en The string corresponding to the internationalized key
     */
    type Result = string
  }

  /**
   * @zh 根据国际化 key 从国际化资源文件（.po）中获取对应的字符串
   * @en Get the corresponding string from the internationalization resource file (.po) based on the internationalization key
   * @example
   * ```js
   * import { getText } from 'zeppos-cross-api/i18n'
   *
   * getText('name')
   * ```
   */
  function getText(key: getText.Key): getText.Result}

/**
  * @zh 交互
  * @en Interaction
  */
declare module 'zeppos-cross-api/interaction' {

  /**
   * @zh 手势上滑
   * @en Gesture up slide
   */
  const GESTURE_UP: number
  /**
   * @zh 手势下滑
   * @en Gesture down slide
   */
  const GESTURE_DOWN: number
  /**
   * @zh 手势左滑
   * @en Gesture left slide
   */
  const GESTURE_LEFT: number
  /**
   * @zh 手势右滑
   * @en Gesture right slide
   */
  const GESTURE_RIGHT: number
  /**
   * @zh BACK 按键
   * @en BACK KEY
   */
  const KEY_BACK: number
  /**
   * @zh SELECT 按键
   * @en SELECT KEY
   */
  const KEY_SELECT: number
  /**
   * @zh HOME 按键
   * @en HOME KEY
   */
  const KEY_HOME: number
  /**
   * @zh UP 按键
   * @en UP KEY
   */
  const KEY_UP: number
  /**
   * @zh DOWN 按键
   * @en SHORTCUT KEY
   */
  const KEY_DOWN: number
  /**
   * @zh SHORTCUT 按键
   * @en SHORTCUT KEY
   */
  const KEY_SHORTCUT: number
  /**
   * @zh 按键点击事件
   * @en Key click event
   */
  const KEY_EVENT_CLICK: number
  /**
   * @zh 按键长按事件
   * @en Key long-press event
   */
  const KEY_EVENT_LONG_PRESS: number
  /**
   * @zh 按键双击事件
   * @en Key double-click event
   */
  const KEY_EVENT_DOUBLE_CLICK: number
  /**
   * @zh 按键按下事件，只要是按下按键就会触发，如一次 CLICK 事件一共会触发三次事件 PRESS -> RELEASE -> CLICK
   * @en Key press event
   */
  const KEY_EVENT_PRESS: number
  /**
   * @zh 按键释放事件
   * @en Key release event
   */
  const KEY_EVENT_RELEASE: number
  /**
   * @zh Modal 确认按键
   * @en Modal Confirm button
   */
  const MODAL_CONFIRM: number
  /**
   * @zh Modal 取消按键
   * @en Modal Cancel button
   */
  const MODAL_CANCEL: number
  namespace showToast {
    interface Option {
      /**
       * @zh 提示的内容
       * @en Content of the prompt
       */
      content: string
    }
  }

  /**
   * @zh 显示消息提示框
   * @en Display Message Prompt Box
   * @img https://img-cdn.huami.com/20220927/d53c5278ad075cdabc9bcf4e359d3d5c.jpg
   * @example
   * ```js
   * import { showToast } from 'zeppos-cross-api/interaction'
   *
   * showToast({
   *   content: 'hello world'
   * })
   * ```
   */
  function showToast(option: showToast.Option): void
  namespace createModal {
    interface Option {
      /**
       * @zh Modal 对话框的内容
       * @en Content of Modal
       */
      content: string
      /**
       * @zh 完成创建后是否立即显示 Modal 对话框
       * @en Whether to display Modal immediately after the creation is completed
       * @defaultValue false
       */
      show?: boolean
      /**
       * @zh 点击确认或者取消的回调函数
       * @en Whether to display Modal immediately
       */
      onClick?: (keyName: ModalKey) => void
      /**
       * @zh 点击确认或者取消按钮后，是否自动关闭 Modal 对话框
       * @en Whether to automatically close the Modal dialog after clicking the Confirm or Cancel button
       * @defaultValue true
       */
      autoHide?: boolean
    }

    /**
     * @zh Modal 按键名，值参考 Modal 按键名常量
     * @en Modal key name, value reference Modal key name constants
     */
    type ModalKey = number

    /**
     * @output
     */
    interface Modal {
      /**
       * @zh 显示或隐藏 Modal 对话框
       * @en Show or hide Modal
       */
      show: (isShow: boolean) => void
    }
  }

  /**
   * @zh 创建 Modal 确认提示框
   * @en Create Modal prompt box
   * @constants modalKey
   * @img https://img-cdn.huami.com/20220927/9a9ce61a400f089c984951ca71c6f9b0.jpg
   * @example
   * ```js
   * import { createModal, MODAL_CONFIRM } from 'zeppos-cross-api/interaction'
   *
   * const dialog = createModal({
   *   content: 'hello world',
   *   autoHide: false,
   *   onClick: (keyName) => {
   *     if (keyName === MODAL_CONFIRM) {
   *       console.log('confirm')
   *     } else {
   *       dialog.show(false)
   *     }
   *   }
   * })
   *
   * dialog.show(true)
   * ```
   */
  function createModal(option: createModal.Option): createModal.Modal
  namespace onGesture {
    interface Option {
      /**
       * @zh 手势事件回调函数
       * @en Gesture event callback function
       */
      callback: (event: GestureEvent) => PreventDefault
    }

    /**
     * @zh 手势事件名，值参考手势事件常量
     * @en Gesture event name, value reference gesture event constants
     */
    type GestureEvent = number

    /**
     * @zh 是否跳过默认手势行为，`true` - 跳过，`false` - 不跳过
     * @en Whether to skip the default gesture behavior, `true` - skip, `false` - don't skip
     */
    type PreventDefault = boolean
  }

  /**
   * @zh 监听用户手势事件，只允许注册一个事件，如果多次注册会导致上一次注册的事件失效
   * @en Listen to user gesture events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail
   * @constants gestureEvent
   * @example
   * ```js
   * import { onGesture, GESTURE_UP } from 'zeppos-cross-api/interaction'
   *
   * onGesture({
   *   callback: (event) => {
   *     if (event === GESTURE_UP) {
   *       console.log('up')
   *     }
   *     return true
   *   }
   * })
   * ```
   */
  function onGesture(option: onGesture.Option): void
  function onGesture(callback: (event: onGesture.GestureEvent) => onGesture.PreventDefault): void
  /**
   * @zh 取消 `onGesture` 注册的监听用户手势事件
   * @en Cancel the `onGesture` registration to listen for user gesture events
   * @example
   * ```js
   * import { onGesture, offGesture, GESTURE_UP } from 'zeppos-cross-api/interaction'
   *
   * const gestureCallback = (event) => {
   *   if (event === GESTURE_UP) {
   *     console.log('up')
   *   }
   *
   *   return true
   * }
   *
   * onGesture({
   *   callback: gestureCallback
   * })
   *
   * offGesture()
   * ```
   */
  function offGesture(): void
  namespace onKey {
    interface Option {
      /**
       * @zh 按键事件回调函数
       * @en Key event callback function
       */
      callback: (key: Key, event: KeyEvent) => PreventDefault
    }

    /**
     * @zh 按键名，值参考按键名常量
     * @en Key name, value reference key name constants
     */
    type Key = number

    /**
     * @zh 按键事件名，值参考按键事件常量
     * @en Key event name, value reference key event constants
     */
    type KeyEvent = number

    /**
     * @zh 是否跳过默认按键行为，`true` - 跳过，`false` - 不跳过
     * @en Whether to skip the default key behavior, `true` - skip, `false` - don't skip
     */
    type PreventDefault = boolean
  }

  /**
   * @zh 监听按键事件，只允许注册一个事件，如果多次注册会导致上一次注册的事件失效
   * @en Listen to key events, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail
   * @constants key
   * @example
   * ```js
   * import { onKey, KEY_UP, KEY_EVENT_CLICK } from 'zeppos-cross-api/interaction'
   *
   * onKey({
   *   callback: (key, keyEvent) => {
   *     if (key === KEY_UP && keyEvent === KEY_EVENT_CLICK) {
   *       console.log('up click')
   *     }
   *     return true
   *   }
   * })
   * ```
   */
  function onKey(option: onKey.Option): void
  function onKey(callback: (key: onKey.Key, event: onKey.KeyEvent) => onKey.PreventDefault): void
  /**
   * @zh 取消 `onKey` 注册的监听按键事件
   * @en Cancel the keystroke event registered by `onKey`.
   * @example
   * ```js
   * import { onKey, offKey, KEY_UP, KEY_EVENT_CLICK } from 'zeppos-cross-api/interaction'
   *
   * const keyCallback = (key, keyEvent) => {
   *   if (key === KEY_UP && keyEvent === KEY_EVENT_CLICK) {
   *     console.log('up click')
   *   }
   *   return true
   * }
   *
   * onKey({
   *   callback: keyCallback
   * })
   *
   * offKey()
   * ```
   */
  function offKey(): void
  namespace onDigitalCrown {
    interface Option {
      /**
       * @zh 数字表冠旋转事件回调函数
       * @en Digital crown rotation event callback function
       */
      callback: (key: Key, degree: Degree) => void
    }

    /**
     * @zh 按键名，值参考按键名常量，目前仅支持 `KEY_HOME`
     * @en Key name, value reference key name constants, currently only `KEY_HOME` is supported
     */
    type Key = number

    /**
     * @zh 旋转角度，正数为逆时针旋转，负数为顺时针旋转。数值为转过的角度，旋转速度越快，绝对值越大
     * @en The rotation angle, positive number is counterclockwise rotation, negative number is clockwise rotation. The value is the angle of rotation, the faster the rotation speed, the larger the absolute value
     */
    type Degree = number
  }

  /**
   * @zh 监听数字表冠旋转事件，只允许注册一个事件，如果多次注册会导致上一次注册的事件失效
   * @en Listen to the digital crown rotation event, only one event is allowed to be registered, if multiple registrations will cause the last registered event to fail
   * @constants key
   * @example
   * ```js
   * import { onDigitalCrown, KEY_HOME } from 'zeppos-cross-api/interaction'
   *
   * onDigitalCrown({
   *   callback: (key, degree) => {
   *     if (key === KEY_HOME) {
   *       console.log(degree)
   *     }
   *   }
   * })
   * ```
   */
  function onDigitalCrown(option: onDigitalCrown.Option): void
  function onDigitalCrown(
    callback: (key: onDigitalCrown.Key, degree: onDigitalCrown.Degree) => void,
  ): void
  /**
   * @zh 取消 `onDigitalCrown` 注册的监听数字表冠旋转事件
   * @en Cancel the `onDigitalCrown` registration to listen for digital crown rotation events
   * @example
   * ```js
   * import { onDigitalCrown, offDigitalCrown, KEY_HOME } from 'zeppos-cross-api/interaction'
   *
   * const callback = (key, degree) => {
   *   if (key === KEY_HOME) {
   *     console.log(degree)
   *   }
   * }
   *
   * onDigitalCrown({
   *   callback
   * })
   *
   * offDigitalCrown()
   * ```
   */
  function offDigitalCrown(): void}

/**
  * @zh 系统通知
  * @en Notification
  */
declare module 'zeppos-cross-api/notification' {

  namespace notify {
    interface Option {
      /**
       * @zh 通知标题文本
       * @en Notice title text
       */
      title: string
      /**
       * @zh 通知内容文本
       * @en Text of the notice
       */
      content: string
      /**
       * @zh 定制按钮数组
       * @en Custom button arrays
       */
      actions: Array<Action>
    }

    interface Action {
      /**
       * @zh 按钮文本
       * @en Button Text
       */
      text: string
      /**
       * @zh 按钮点击要启动的「设备应用服务」文件
       * @en The App Service file to be started
       */
      file: string
      /**
       * @zh 文件加载时传入的参数
       * @en Parameters passed in during file loading
       */
      param?: string
    }

    /**
     * @zh 通知发送的结果，返回 `0` 代表发送失败，其余结果表明通知的 ID 标识
     * @en The result of the notification delivery, returns `0` for delivery failure, the rest of the result indicates the ID of the notification
     */
    type Result = number
  }

  /**
   * @zh 发送通知到手表通知中心
   * @en Send notifications to the Watch Notification Center
   * @permissionCode device:os.notification
   * @version 3.0
   * @example
   * ```js
   * import { notify } from 'zeppos-cross-api/notification'
   * ```
   */
  function notify(option: notify.Option): notify.Result
  /**
   * @zh 删除通知中心里指定 ID 标识的通知信息
   * @en Delete the notification message identified by the specified ID in the notification center
   * @permissionCode device:os.notification
   * @version 3.0
   * @example
   * ```js
   * import { cancel } from 'zeppos-cross-api/notification'
   *
   * cancel(alarmID)
   * ```
   */
  function cancel(alarmId: number | Array<number>): void
  /**
   * @zh 获取当前应用已发送的还留在通知中心里通知 ID
   * @en Get the notification IDs that have been sent by the current app and are still in the notification center
   * @permissionCode device:os.notification
   * @version 3.0
   * @example
   * ```js
   * import { getAllNotifications } from 'zeppos-cross-api/notification'
   *
   * getAllNotifications()
   * ```
   */
  function getAllNotifications(): Array<number>}

/**
  * @zh 页面
  * @en Page related
  */
declare module 'zeppos-cross-api/page' {

  /**
   * @zh 自由滚动，系统默认滚动模式
   * @en Free scrolling mode, system default scrolling mode
   */
  const SCROLL_MODE_FREE: string
  /**
   * @zh Swiper 模式，竖向轮播图、走马灯，通过配置单个页面高度和数量可以做到整屏滚动效果
   * @en Swiper mode, vertical rotating map, walking lights, by configuring the height and number of individual pages can achieve the whole screen scrolling effect
   */
  const SCROLL_MODE_SWIPER: string
  /**
   * @zh Swiper 模式，横向轮播图、走马灯，通过配置单个页面宽度和数量可以做到整屏滚动效果
   * @en Swiper mode, horizontal rotating map, walking lights, by configuring the width and number of individual pages can achieve the whole screen scrolling effect
   * @version 2.1
   */
  const SCROLL_MODE_SWIPER_HORIZONTAL: string
  /**
   * @zh 平滑滚动至对应位置
   * @en Scroll smoothly to the corresponding position
   */
  const SCROLL_ANIMATION_SMOOTH: string
  /**
   * @zh 无动画，直接滚动至对应位置
   * @en No animation, scroll directly to the corresponding position
   */
  const SCROLL_ANIMATION_NONE: string
  namespace scrollTo {
    interface Option {
      /**
       * @zh 页面的纵轴坐标
       * @en Vertical axis coordinates of the page
       */
      y: number
    }
  }

  /**
   * @zh 滚动页面至指定位置
   * @en Scroll the page to the specified position
   * @example
   * ```js
   * import { scrollTo } from 'zeppos-cross-api/page'
   *
   * scrollTo({
   *    y: 200
   * })
   * ```
   */
  function scrollTo(option: scrollTo.Option): void
  function scrollTo(y: number): void
  namespace getScrollTop {
    /**
     * @zh 垂直坐标
     * @en The vertical coordinate of the current scroll position of the page
     */
    type Result = number
  }

  /**
   * @zh 获取页面当前滚动位置的垂直坐标
   * @en Get the vertical coordinate of the current scroll position of the page
   * @example
   * ```js
   * import { getScrollTop } from 'zeppos-cross-api/page'
   *
   * const top = getScrollTop()
   * console.log(top)
   * ```
   */
  function getScrollTop(): getScrollTop.Result
  namespace setScrollMode {
    interface Option {
      /**
       * @zh 页面滚动模式，值参考页面滚动模式常量
       * @en Page scroll mode, value reference page scroll mode constants
       */
      mode: string
      /**
       * @zh 其他选项
       * @en Other Options
       */
      options?: Options
    }

    interface Options {
      /**
       * @zh 指定 Swiper 中单个项目的高度，仅当页面滚动模式为 `SCROLL_MODE_SWIPER` 生效
       * @en Specify the height of a single item in Swiper, effective only if the scroll mode is `SCROLL_MODE_SWIPER`
       */
      height?: number
      /**
       * @zh 指定 Swiper 中项目的数量，仅当页面滚动模式为 `SCROLL_MODE_SWIPER` 和 `SCROLL_MODE_SWIPER_HORIZONTAL` 生效
       * @en Specify the number of items in the Swiper, effective only if the scroll mode is `SCROLL_MODE_SWIPER` or `SCROLL_MODE_SWIPER_HORIZONTAL`
       */
      count?: number
      /**
       * @zh 指定 Swiper 中单个项目的宽度，仅当页面滚动模式为 `SCROLL_MODE_SWIPER_HORIZONTAL` 生效
       * @en Specify the width of a single item in Swiper, effective only if the scroll mode is `SCROLL_MODE_SWIPER_HORIZONTAL`
       * @version 2.1
       */
      width?: number
      /**
       * @zh 模式的控制参数
       * @en Parameters for the scroll mode
       * @version 3.0
       */
      modeParams?: FreeModeParams | SwipeModeParams
    }

    /**
     * @output
     */
    interface FreeModeParams {
      /**
       * @zh 滚动过程中每帧的回调函数
       * @en The callback function for each frame during scrolling
       * @version 3.0
       */
      scroll_frame_func: (params: ScrollObj) => void
      /**
       * @zh 滚动结束的回调函数
       * @en The end of the scroll callback function
       * @version 3.0
       */
      scroll_complete_func: (params: ScrollObj) => void
    }

    /**
     * @output
     */
    interface ScrollObj {
      /**
       * @zh 待补充
       * @en Todo
       * @version 3.0
       */
      type: number
      /**
       * @zh y 轴偏移的像素
       * @en Pixel offset on the y axis
       * @version 3.0
       */
      yoffset: number
    }

    /**
     * @output
     */
    interface SwipeModeParams {
      /**
       * @zh 翻页完成后的回调函数，`pageIndex` 为翻页完成后的页面索引，索引从 0 开始
       * @en Callback function after page flipping, `pageIndex` is the page index after page flipping, and the index starts from `0`
       * @version 3.0
       */
      on_page: (pageIndex: number) => void
      /**
       * @zh 是否响应表冠事件，默认响应，可以通过表冠来控制翻页
       * @en Whether to respond to crown events, the default response, you can use the crown to control page turning
       * @defaultValue true
       * @version 3.0
       */
      crown_enable: boolean
    }

    /**
     * @zh 如果返回 `true` 则表明成功
     * @en If `true` is returned, success is indicated
     */
    type Result = number
  }

  /**
   * @zh 设置页面的滚动模式
   * @en Set the scroll mode of the page
   * @constants scrollMode
   * @example
   * ```js
   * import { setScrollMode, SCROLL_MODE_SWIPER } from 'zeppos-cross-api/page'
   *
   * setScrollMode({
   *   mode: SCROLL_MODE_SWIPER,
   *   options: {
   *     height: 480,
   *     count: 10
   *   }
   * })
   * ```
   */
  function setScrollMode(option: setScrollMode.Option): setScrollMode.Result
  namespace setScrollLock {
    interface Option {
      /**
       * @zh 是否锁定当前页面滚动位置
       * @en Whether to lock the current page scroll position
       * @defaultValue true
       */
      lock?: boolean
    }
  }

  /**
   * @zh 设置当前页面滚动位置锁定，即屏幕位置不会跟随手势滑动改变。调用此 API 执行解锁操作之后，页面滚动模式会设置为自由滚动模式
   * @en Set the current page scrolling position to be locked, i.e. the screen position will not change with the gesture swipe. After calling this API to perform the unlock operation, the page scrolling mode will be set to free scrolling mode
   * @example
   * ```js
   * import { setScrollLock } from 'zeppos-cross-api/page'
   *
   * setScrollLock({
   *   lock: true
   * })
   * ```
   */
  function setScrollLock(option: setScrollLock.Option): void
  namespace swipeToIndex {
    interface Option {
      /**
       * @zh 目标项目的索引
       * @en Target Swiper Item Index
       */
      index: number
      /**
       * @zh 滚动动画，值参考页面滚动动画常量
       * @en Scrolling animation, value reference page scrolling animation constants
       * @defaultValue `SCROLL_ANIMATION_SMOOTH`
       */
      animation?: string
    }
  }

  /**
   * @zh 将页面滚动至 Swiper 的目标项目，仅当当前页面滚动模式为 `SCROLL_MODE_SWIPER` 的时候生效
   * @en Scrolls the page to the Swiper's target item, only if the current page scroll mode is `SCROLL_MODE_SWIPER`
   * @constants scrollAnimation
   * @example
   * ```js
   * import { setScrollMode, swipeToIndex, SCROLL_MODE_SWIPER } from 'zeppos-cross-api/page'
   *
   * setScrollMode({
   *   mode: SCROLL_MODE_SWIPER,
   *   options: {
   *     height: 480,
   *     count: 10
   *   }
   * })
   *
   * swipeToIndex({
   *   index: 5
   * })
   * ```
   */
  function swipeToIndex(option: swipeToIndex.Option): void
  namespace getSwiperIndex {
    /**
     * @zh 页面滚动模式为 `SCROLL_MODE_SWIPER` 或 `SCROLL_MODE_SWIPER_HORIZONTAL` 时，值为当前项目的索引（从 `1` 开始）。否则为 `undefined`
     * @en If the page scroll mode is `SCROLL_MODE_SWIPER` or `SCROLL_MODE_SWIPER_HORIZONTAL`, the value is the index of the current item (starting from `1`). Otherwise, it is `undefined`.
     */
    type Result = number | undefined
  }

  /**
   * @zh 获取当前页面的滚动位置，仅当页面滚动模式为 `SCROLL_MODE_SWIPER` 或 `SCROLL_MODE_SWIPER_HORIZONTAL` 返回当前项目的索引（从 `1` 开始），否则返回 `undefined`
   * @en Get the scroll position of the current page, only if the page scroll mode is `SCROLL_MODE_SWIPER` or `SCROLL_MODE_SWIPER_HORIZONTAL` return the index of the current item (starting from `1`), otherwise return `undefined`
   * @example
   * ```js
   * import { setScrollMode, swipeToIndex, getSwiperIndex, SCROLL_MODE_SWIPER } from 'zeppos-cross-api/page'
   *
   * setScrollMode({
   *   mode: SCROLL_MODE_SWIPER,
   *   options: {
   *     height: 480,
   *     count: 10
   *   }
   * })
   *
   * swipeToIndex({
   *   index: 5
   * })
   *
   * const currentIndex = getSwiperIndex()
   * console.log(currentIndex)
   * ```
   */
  function getSwiperIndex(): getSwiperIndex.Result}

/**
  * @zh 路由
  * @en Router
  */
declare module 'zeppos-cross-api/router' {

  /**
   * @zh 今日活动
   * @en Activity
   * @version 3.0
   */
  const SYSTEM_APP_STATUS: number

  /**
   * @zh 心率
   * @en Heart Rate
   * @version 3.0
   */
  const SYSTEM_APP_HR: number

  /**
   * @zh 运动
   * @en Workout
   * @version 3.0
   */
  const SYSTEM_APP_SPORT: number

  /**
   * @zh 天气
   * @en Weather
   * @version 3.0
   */
  const SYSTEM_APP_WEATHER: number

  /**
   * @zh 闹钟
   * @en Alarm
   * @version 3.0
   */
  const SYSTEM_APP_ALARM: number

  /**
   * @zh 遥控拍照
   * @en Camera Remote
   * @version 3.0
   */
  const SYSTEM_APP_CAMERA: number

  /**
   * @zh 音乐
   * @en Music
   * @version 3.0
   */
  const SYSTEM_APP_MUSIC: number

  /**
   * @zh 秒表
   * @en Stopwatch
   * @version 3.0
   */
  const SYSTEM_APP_STOPWATCH: number

  /**
   * @zh 倒计时
   * @en Timer
   * @version 3.0
   */
  const SYSTEM_APP_COUNTDOWN: number

  /**
   * @zh 查找手机
   * @en Find My Phone
   * @version 3.0
   */
  const SYSTEM_APP_FINE_PHONE: number

  /**
   * @zh 卡包
   * @en Cards
   * @version 3.0
   */
  const SYSTEM_APP_CARD: number

  /**
   * @zh 支付宝
   * @en Alipay
   * @version 3.0
   */
  const SYSTEM_APP_ALIPAY: number

  /**
   * @zh 设置
   * @en Settings
   * @version 3.0
   */
  const SYSTEM_APP_SETTING: number

  /**
   * @zh 运动记录
   * @en Workout History
   * @version 3.0
   */
  const SYSTEM_APP_SPORT_HISTORY: number

  /**
   * @zh 指南针
   * @en Compass
   * @version 3.0
   */
  const SYSTEM_APP_COMPASS: number

  /**
   * @zh PAI
   * @en PAI
   * @version 3.0
   */
  const SYSTEM_APP_PAI: number

  /**
   * @zh 世界时钟
   * @en World Clock
   * @version 3.0
   */
  const SYSTEM_APP_WORLD_CLOCK: number

  /**
   * @zh 压力
   * @en Stress
   * @version 3.0
   */
  const SYSTEM_APP_PRESSURE: number

  /**
   * @zh 生理周期
   * @en Cycle Tracking
   * @version 3.0
   */
  const SYSTEM_APP_MENSTRUAL: number

  /**
   * @zh 运动状态
   * @en Workout Status
   * @version 3.0
   */
  const SYSTEM_APP_SPORT_STATUS: number

  /**
   * @zh 日历
   * @en Calendar
   * @version 3.0
   */
  const SYSTEM_APP_CALENDAR: number

  /**
   * @zh 睡眠
   * @en Sleep
   * @version 3.0
   */
  const SYSTEM_APP_SLEEP: number

  /**
   * @zh 血氧
   * @en Blood Oxygen
   * @version 3.0
   */
  const SYSTEM_APP_SPO2: number

  /**
   * @zh 电话
   * @en Phone
   * @version 3.0
   */
  const SYSTEM_APP_PHONE: number

  /**
   * @zh 网易云音乐
   * @en NetEase Music
   * @version 3.0
   */
  const SYSTEM_APP_NETEASE_MUSIC: number

  /**
   * @zh 微信支付
   * @en Weixin Pay
   * @version 3.0
   */
  const SYSTEM_APP_WEPAY: number

  /**
   * @zh 呼吸
   * @en Breathe
   * @version 3.0
   */
  const SYSTEM_APP_BREATH: number

  /**
   * @zh 番茄钟
   * @en Pomodoro Timer
   * @version 3.0
   */
  const SYSTEM_APP_POMODORO: number

  /**
   * @zh Alexa
   * @en Alexa
   * @version 3.0
   */
  const SYSTEM_APP_ALEAX: number

  /**
   * @zh 温度计
   * @en Thermometer
   * @version 3.0
   */
  const SYSTEM_APP_THERMOMETER: number

  /**
   * @zh 待办事项
   * @en To Do
   * @version 3.0
   */
  const SYSTEM_APP_TODO_LIST: number

  /**
   * @zh 气压高度计
   * @en Barometer
   * @version 3.0
   */
  const SYSTEM_APP_ALTIMETER: number

  /**
   * @zh 语音备忘录
   * @en Voice Memos
   * @version 3.0
   */
  const SYSTEM_APP_VOICE_MEMO: number

  /**
   * @zh 太阳和月亮
   * @en Sun & Moon
   * @version 3.0
   */
  const SYSTEM_APP_SUN_AND_MOON: number

  /**
   * @zh 一键测量
   * @en One-tap Measuring
   * @version 3.0
   */
  const SYSTEM_APP_MEASUREMENT: number

  /**
   * @zh Zepp 运动教练
   * @en Zepp Coach
   * @version 3.0
   */
  const SYSTEM_APP_ZEPP_COACH: number

  /**
   * @zh 会员卡
   * @en Membership Card
   * @version 3.0
   */
  const SYSTEM_APP_CLUB_CARD: number

  /**
   * @zh 身体成分
   * @en Body Composition
   * @version 3.0
   */
  const SYSTEM_APP_BODY_COMPOSITION: number

  /**
   * @zh 身心准备度
   * @en Readiness
   * @version 3.0
   */
  const SYSTEM_APP_READINESS: number
  namespace launchApp {
    interface Option {
      /**
       * @zh 小程序 ID
       * @en Mini Program ID
       */
      appId: number
      /**
       * @zh 页面路径
       * @en path
       */
      url: string
      /**
       * @zh 是否跳转系统应用，3.0 版本支持跳转系统应用，参考系统应用 ID 常量
       * @en Whether to jump to the system App, version 3.0 supports jumping to the system App, refer to the system App ID constant
       * @default false
       * @version 3.0
       */
      native: boolean
      /**
       * @zh 传递给 app.js 生命周期 `onCreate` 中的参数，支持字符串或者标准 JSON 对象。如果传递标准 JSON 对象，该方法内部会将其转为字符串
       * @en The argument passed to the app.js lifecycle `onCreate` supports either a string or a standard JSON object. If a standard JSON object is passed, the method internally converts it to a string
       */
      params?: string | object
    }
  }

  /**
   * @zh 打开小程序
   * @en Open Mini Program
   * @constants system_app
   * @example
   * ```js
   * import { launchApp } from 'zeppos-cross-api/router'
   *
   * launchApp({
   *    appId: 1000001,
   *    url: 'pages/js_widget_sample',
   *    params: {
   *      type: 1
   *   }
   * })
   * ```
   */
  function launchApp(option: launchApp.Option): void
  namespace push {
    interface Option {
      /**
       * @zh 页面路径
       * @en path
       */
      url: string
      /**
       * @zh 传递给 page.js `onInit` 生命周期中的参数，支持字符串或者标准 JSON 对象。如果传递标准 JSON 对象，该方法内部会将其转为字符串
       * @en Parameters passed to the page `onInit` lifecycle, supporting strings or standard JSON object. If a standard JSON object is passed, the method internally converts it to a string
       */
      params?: string | object
    }
  }

  /**
   * @zh
   * 跳转到小程序内的某个页面，使用 `back` 方法可以回到原页面
   * @en
   * Navigate to a page within the Mini Program. Use the `back` method to go back to the original page
   * @example
   * ```js
   * import { push } from 'zeppos-cross-api/router'
   *
   * push({
   *    url: 'page/index',
   *    params: 'type=1'
   * })
   * ```
   */
  function push(option: push.Option): void
  namespace replace {
    interface Option {
      /**
       * @zh 页面路径
       * @en path
       */
      url: string
      /**
       * @zh 传递给 page.js `onInit` 生命周期中的参数，支持字符串或者标准 JSON 对象。如果传递标准 JSON 对象，该方法内部会将其转为字符串
       * @en Parameters passed to the page `onCreate` lifecycle, supporting strings or standard JSON objects. If a standard JSON object is passed, the method internally converts it to a string
       */
      params?: string | object
    }
  }

  /**
   * @zh
   * 关闭当前页面，跳转到小程序内的某个页面
   * @en
   * Close the current page and jump to a page within the app
   * @example
   * ```js
   * import { replace } from 'zeppos-cross-api/router'
   *
   * replace({
   *    url: 'page/index',
   *    params: 'type=1'
   * })
   * ```
   */
  function replace(option: replace.Option): void
  /**
   * @zh
   * 退出小程序，返回至表盘页面
   * @en
   * Exit the Mini Program and return to the watchface page
   * @example
   * ```js
   * import { home } from 'zeppos-cross-api/router'
   *
   * home()
   * ```
   */
  function home(): void
  /**
   * @zh
   * 关闭当前页面，返回上一页面
   * @en
   * Closes the current page to return to the previous page
   * @example
   * ```js
   * import { back } from 'zeppos-cross-api/router'
   *
   * back()
   * ```
   */
  function back(): void
  /**
   * @zh
   * 关闭当前小程序，回到应用列表页面
   * @en
   * Exit the Mini Program and return to the applist page
   * @example
   * ```js
   * import { exit } from 'zeppos-cross-api/router'
   *
   * exit()
   * ```
   */
  function exit(): void
  namespace setLaunchAppTimeout {
    interface Option {
      /**
       * @zh 小程序 ID
       * @en Mini Program ID
       */
      appId: number
      /**
       * @zh 页面路径
       * @en path
       */
      url: string
      /**
       * @zh utc 时间戳（毫秒）
       * @en utc timestamp(milliseconds)
       */
      utc?: number
      /**
       * @zh 传递给 app.js 生命周期 `onCreate` 中的参数，支持字符串或者标准 JSON 对象。如果传递标准 JSON 对象，该方法内部会将其转为字符串
       * @en The argument passed to the app.js lifecycle `onCreate` supports either a string or a standard JSON object. If a standard JSON object is passed, the method internally converts it to a string
       */
      params?: string | object
    }

    /**
     * @zh 表示定时器的编号，这个值可以传递给 `clearLaunchAppTimeout` 来取消定时器
     * @en The returned value is a positive integer value which identifies the timer created by the call to `setLaunchAppTimeout`. This value can be passed to `clearLaunchAppTimeout` to cancel the timeout.
     */
    type Result = number
  }

  /**
   * @zh 注册一个定时器，定时唤起小程序，在此期间如果设备重启，则定时器会失效
   * @en Register a timer to launch the Mini Program at a given time
   * @example
   * ```js
   * import { setLaunchAppTimeout, clearLaunchAppTimeout } from 'zeppos-cross-api/router'
   * import { Time } from 'zeppos-cross-api/sensor'
   *
   * const time = new Time()
   * const timeoutId = setLaunchAppTimeout({
   *   url: 'pages/js_widget_sample',
   *   appId: 1000001,
   *   utc: time.getTime() + 1000
   * })
   *
   * clearLaunchAppTimeout({
   *   timeoutId
   * })
   * ```
   */
  function setLaunchAppTimeout(option: setLaunchAppTimeout.Option): setLaunchAppTimeout.Result
  namespace clearLaunchAppTimeout {
    interface Option {
      /**
       * @zh 需要取消的唤醒小程序定时器的编号，这个值通过 `setLaunchAppTimeout` 返回
       * @en The identifier of the timeout you want to cancel. This ID was returned by the corresponding call to `setLaunchAppTimeout`()
       */
      timeoutId: number
    }

    /**
     * @zh 表示定时器的编号，这个值可以传递给 `clearLaunchAppTimeout` 来取消定时器
     * @en The returned value is a positive integer value which identifies the timer created by the call to `setLaunchAppTimeout`. This value can be passed to `clearLaunchAppTimeout` to cancel the timeout
     */
    type Result = number
  }

  /**
   * @zh 取消 `setLaunchAppTimeout` 创建的唤醒小程序定时器
   * @en Cancel the wakeup Mini Program timer created by `setLaunchAppTimeout`
   * @example
   * ```js
   * import { setLaunchAppTimeout, clearLaunchAppTimeout } from 'zeppos-cross-api/router'
   *
   * const timeoutId = setLaunchAppTimeout({
   *   url: 'pages/js_widget_sample',
   *   appId: 1000001,
   *   delay: 10000
   * })
   *
   * clearLaunchAppTimeout({
   *   timeoutId
   * })
   * ```
   */
  function clearLaunchAppTimeout(option: clearLaunchAppTimeout.Option): void
  function clearLaunchAppTimeout(timeoutId: number): void
  namespace checkSystemApp {
    interface Option {
      /**
       * @zh 需要跳转的系统应用 ID，值参考系统应用 ID 常量
       * @en ID of the system App to be jumped to, value refers to the system App ID constant
       */
      appId: number
    }
  }

  /**
   * @zh 检查系统应用是否支持跳转
   * @en Check if the system application supports jumping
   * @constants system_app
   * @version 3.0
   * @example
   * ```js
   * import { checkSystemApp, SYSTEM_APP_STATUS } from 'zeppos-cross-api/router'
   *
   * checkSystemApp({
   *   appId: SYSTEM_APP_STATUS
   * })
   * ```
   */
  function checkSystemApp(option: checkSystemApp.Option): void
  function checkSystemApp(appId: number): void}

/**
  * @zh 传感器
  * @en Sensor
  */
declare module 'zeppos-cross-api/sensor' {

  /**
   * @zh 振动强度轻，时间较短（20ms）
   * @en Light vibration intensity and short time (20ms)
   */
  const VIBRATOR_SCENE_SHORT_LIGHT: number
  /**
   * @zh 振动强度中等，时间较短（20ms）
   * @en Medium vibration intensity, short time (20ms)
   */
  const VIBRATOR_SCENE_SHORT_MIDDLE: number
  /**
   * @zh 振动强度高，时间较短（20ms）
   * @en High vibration intensity and short time (20ms)
   */
  const VIBRATOR_SCENE_SHORT_STRONG: number
  /**
   * @zh 振动强度高，持续 600ms
   * @en High vibration intensity, lasting 600ms
   */
  const VIBRATOR_SCENE_DURATION: number
  /**
   * @zh 振动强度高，持续 1000ms
   * @en High vibration intensity, lasting 1000ms
   */
  const VIBRATOR_SCENE_DURATION_LONG: number
  /**
   * @zh 振动强度高，1200ms 内振动四次，用于较强提醒
   * @en High vibration intensity, four vibrations in 1200ms, can be used for stronger reminders
   */
  const VIBRATOR_SCENE_STRONG_REMINDER: number
  /**
   * @zh 短促振动两次，与手表消息通知振动反馈一致
   * @en Two short, continuous vibrations, consistent with the watch message notification vibration feedback
   */
  const VIBRATOR_SCENE_NOTIFICATION: number
  /**
   * @zh 振动强度高，单次 500ms 内振动两次，持续振动，需要手动 `stop` 才会停止，与手表来电振动反馈一致
   * @en High vibration intensity, single vibration twice in 500ms, continuous vibration, need to manually `stop`, consistent with the watch call vibration feedback
   */
  const VIBRATOR_SCENE_CALL: number
  /**
   * @zh 振动强度高，单次长振动 500ms，持续振动，需要手动 `stop` 才会停止，与手表闹钟、倒计时振动反馈一致
   * @en High vibration intensity, single long vibration 500ms, continuous vibration, need to manually `stop`, consistent with the watch alarm clock, countdown vibration feedback
   */
  const VIBRATOR_SCENE_TIMER: number
  /**
   * @zh 12 小时制
   * @en 12-hour format
   * @version 2.1
   */
  const TIME_HOUR_FORMAT_12: number
  /**
   * @zh 24 小时制
   * @en 24-hour format
   * @version 2.1
   */
  const TIME_HOUR_FORMAT_24: number
  /**
   * @zh 低功耗模式，触发频率低
   * @en Low power mode with low trigger frequency
   * @version 3.0
   */
  const FREQ_MODE_LOW: number
  /**
   * @zh 正常功耗模式，触发频率中等
   * @en Normal power consumption mode, medium trigger frequency
   * @version 3.0
   */
  const FREQ_MODE_NORMAL: number
  /**
   * @zh 高功耗模式，触发频率高
   * @en High power consumption mode with high trigger frequency
   * @version 3.0
   */
  const FREQ_MODE_HIGH: number
  namespace Time {
    namespace getLunarMonthCalendar {
      /**
       * @output
       */
      interface LunarMonthCalendar {
        /**
         * @zh 当前月的天数
         * @en Number of days in the current month
         */
        day_count: number
        /**
         * @zh 当前月每一天展示内容数组，展示内容优先级为节日、节气、日期
         * @en Array of display content for each day of the current month, display content priority for holidays, Solar Term, date
         */
        lunar_days_array: Array<string>
      }
    }
  }

  /**
   * @zh 时间/日期传感器
   * @en Time/Date Sensor
   * @example
   * ```js
   * import { Time } from 'zeppos-cross-api/sensor'
   *
   * const time = new Time()
   * const currentTime = time.getTime()
   * ```
   */
  class Time {
    /**
     * @zh 获取 UTC 时间戳，单位毫秒
     * @en Gets the UTC timestamp in milliseconds
     */
    getTime(): number
    /**
     * @zh 获取当前日期的年份
     * @en Get the year of the current date
     */
    getFullYear(): number
    /**
     * @zh 获取当前日期的月份，范围 1 - 12，返回 `1` 代表 1 月
     * @en Get the month of the current date, range 1 - 12, return `1` for January
     */
    getMonth(): number
    /**
     * @zh 获取当前日期的天数，即一个月中的哪一天，范围 1 - 31
     * @en Get the number of days of the current date, i.e. the day of the month, in the range 1 - 31
     */
    getDate(): number
    /**
     * @zh 获取当前时间的小时数
     * @en Get the number of hours of the current time
     */
    getHours(): number
    /**
     * @zh 获取当前时间的分钟数
     * @en Get the number of minutes of the current time
     */
    getMinutes(): number
    /**
     * @zh 获取当前时间的秒数
     * @en Get the number of seconds of the current time
     */
    getSeconds(): number
    /**
     * @zh 获取当前时间对应一周中的第几天，范围 1 - 7，返回 `1` 代表星期一
     * @en Get the current time corresponding to the day of the week, range 1 - 7, return `1` for Monday
     */
    getDay(): number
    /**
     * @zh 获取当前系统时间格式，12 小时/24 小时，值参考小时格式常量
     * @en Get the current system time format, 12-hour format or 24-hour format，value reference hour format constants
     * @constants hour_format
     * @version 2.1
     */
    getHourFormat(): number
    /**
     * @zh 获取当前时间格式（12 小时/24 小时）下的小时数
     * @en Get the number of hours in the current time format (12-hour format or 24-hour format)
     * @version 2.1
     */
    getFormatHour(): number
    /**
     * @zh 注册每分钟结束事件监听回调函数
     * @en Register end-of-minute event listener callback function
     * @version 2.1
     */
    onPerMinute(callback: () => void): void
    /**
     * @zh 注册每天结束事件监听回调函数
     * @en Register the end-of-day event listener callback function
     * @version 2.1
     */
    onPerDay(callback: () => void): void
    /**
     * @zh 获取公历节日，如果没有节日，则返回字符串 `'INVALID'`
     * @en Get gregorian holidays, or return the string `'INVALID'` if there is no holiday
     */
    getFestival(): string
    /**
     * @zh 获取中国农历年份，仅在系统语言设置为中文时生效
     * @en Get Chinese lunar year, only works when system language is set to Chinese
     */
    getLunarYear(): number
    /**
     * @zh 获取中国农历月份，仅在系统语言设置为中文时生效
     * @en Get Chinese lunar month, only works when system language is set to Chinese
     */
    getLunarMonth(): number
    /**
     * @zh 获取中国农历日期，仅在系统语言设置为中文时生效
     * @en Get Chinese lunar day, only works when system language is set to Chinese
     */
    getLunarDay(): number
    /**
     * @zh 获取中国农历节日，仅在系统语言设置为中文时生效，如果没有节日，则返回字符串 `'INVALID'`
     * @en Get Chinese lunar holidays, only works when system language is set to Chinese, or return the string `'INVALID'` if there is no holiday
     */
    getLunarFestival(): string
    /**
     * @zh 获取中国农历节气，仅在系统语言设置为中文时生效，如果没有节气，则返回字符串 `'INVALID'`
     * @en Get Traditional Chinese Solar Terms, only works when system language is set to Chinese, or return the string `'INVALID'` if there is no Solar Term
     */
    getSolarTerm(): string
    /**
     * @zh 获取当天显示的节日字符串，仅在系统语言设置为中文时生效，优先级依次是公历节日、中国农历节日、中国农历节气，
     * @en Get the holiday strings displayed on that day, the priority is Gregorian holidays, Chinese lunar holidays, Chinese lunar festivals in that order, only when the system language is set to Chinese
     */
    getShowFestival(): string
    /**
     * @zh 获取中国农历当前月的月历信息，仅在系统语言设置为中文时生效
     * @en Get the monthly calendar information of the current month of Chinese lunar calendar, only works when the system language is set to Chinese
     */
    getLunarMonthCalendar(): Time.getLunarMonthCalendar.LunarMonthCalendar
    /**
     * @zh 注册日出事件监听回调函数，仅当设备天气信息时才会生效
     * @en Register the Sunrise event listener callback function to take effect only when the device weather information
     * @version 3.0
     */
    onSunrise(callback: () => void): void
    /**
     * @zh 注册日落事件监听回调函数，仅当设备天气信息时才会生效
     * @en Register the Sunset event listener callback function to take effect only when the device weather information
     * @version 3.0
     */
    onSunset(callback: () => void): void
    /**
     * @zh 注册手机修改时间事件监听回调函数
     * @en Register the phone modify time event listening callback function
     * @version 3.0
     */
    onPhoneTimeSetting(callback: () => void): void
  }
  /**
   * @zh 电量传感器
   * @en Battery Sensor
   * @example
   * ```js
   * import { Battery } from 'zeppos-cross-api/sensor'
   *
   * const battery = new Battery()
   * const current = battery.getCurrent()
   *
   * const callback = () => {
   *   console.log(battery.getCurrent())
   * }
   *
   * battery.onChange(callback)
   *
   * // When not needed for use
   * battery.offChange(callback)
   * ```
   */
  class Battery {
    /**
     * @zh 获取当前设备电量百分比，范围 0 - 100
     * @en Get the current device power percentage, range 0 - 100
     */
    getCurrent(): number
    /**
     * @zh 注册电量变化事件监听回调函数
     * @en Register the power change event callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消电量变化事件监听回调函数
     * @en Cancel the power change event callback function
     */
    offChange(callback: () => void): void
  }
  /**
   * @zh 步数传感器
   * @en Step Sensor
   * @permissionCode data:user.hd.step
   * @example
   * ```js
   * import { Step } from 'zeppos-cross-api/sensor'
   *
   * const step = new Step()
   * const current = step.getCurrent()
   * const target = step.getTarget()
   * const callback = () => {
   *   console.log(step.getCurrent())
   * }
   *
   * step.onChange(callback)
   *
   * // When not needed for use
   * step.offChange(callback)
   * ```
   */
  class Step {
    /**
     * @zh 获取当前步数
     * @en Get the current step count
     */
    getCurrent(): number
    /**
     * @zh 获取步数目标
     * @en Get step goal
     */
    getTarget(): number
    /**
     * @zh 注册步数变化事件监听回调函数
     * @en Register the step change event callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消步数变化事件监听回调函数
     * @en Cancel the step change event callback function
     */
    offChange(callback: () => void): void
  }
  /**
   * @zh 卡路里传感器
   * @en Calorie Sensor
   * @permissionCode data:user.hd.calorie
   * @example
   * ```js
   * import { Calorie } from 'zeppos-cross-api/sensor'
   *
   * const calorie = new Calorie()
   * const current = calorie.getCurrent()
   * const target = calorie.getTarget()
   * const callback = () => {
   *   console.log(calorie.getCurrent())
   * }
   *
   * calorie.onChange(callback)
   *
   * // When not needed for use
   * calorie.offChange(callback)
   * ```
   */
  class Calorie {
    /**
     * @zh 获取当前消耗卡路里，单位 kcal
     * @en Get the current calorie consumption in kcal
     */
    getCurrent(): number
    /**
     * @zh 获取目标消耗卡路里，单位 kcal
     * @en Get the target calorie consumption in kcal
     */
    getTarget(): number
    /**
     * @zh 注册卡路里消耗变化事件监听回调函数
     * @en Register the calories change event callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消卡路里消耗变化事件监听回调函数
     * @en Cancel the calories change event callback function
     */
    offChange(callback: () => void): void
  }
  namespace HeartRate {
    namespace getDailySummary {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh 最高心率信息
         * @en Maximum heart rate information
         */
        maximum: Maximum
      }

      /**
       * @output
       */
      interface Maximum {
        /**
         * @zh 最高心率值
         * @en Maximum heart rate value
         */
        hr_value: number
        /**
         * @zh 最高心率的测量时间
         * @en Measurement time of maximum heart rate
         */
        time: number
      }
    }

    namespace getAFibRecord {
      /**
       * @zh 房颤信息数组
       * @en Atrial Fibrillation Information Array
       */
      type Result = Array<AfibInfo>

      /**
       * @output
       */
      interface AfibInfo {
        /**
         * @zh 房颤检测结果，`0` - 正常、`1` - 高预警、`2` - 低预警、`3` - 房颤
         * @en Atrial fibrillation test results, `0` - normal, `1` - high alert, `2` - low alert, `3` - atrial fibrillation
         */
        flag: number
        /**
         * @zh 房颤数据值，值为 0 - 255 的整数
         * @en Atrial fibrillation data value, integer value 0 - 255
         */
        val: number
        /**
         * @zh 房颤数据最大值，值为 0 - 255 的整数
         * @en Atrial fibrillation data maximum value, integer value 0 - 255
         */
        maxValue: number
        /**
         * @zh 房颤数据最小值，值为 0 - 255 的整数
         * @en Atrial fibrillation data minimum value, integer value 0 - 255
         */
        minValue: number
        /**
         * @zh 房颤数据采集的时间，UTC 秒
         * @en Time of Atrial fibrillation data acquisition, UTC seconds
         */
        time: number
        /**
         * @zh 持续时间，单位秒
         * @en Duration in seconds
         */
        duration: number
      }
    }
  }

  /**
   * @zh 心率传感器
   * @en HeartRate Sensor
   * @permissionCode data:user.hd.heart_rate
   * @example
   * ```js
   * import { HeartRate } from 'zeppos-cross-api/sensor'
   *
   * const heartRate = new HeartRate()
   * const lastValue = heartRate.getLast()
   *
   * const callback = () => {
   *   console.log(heartRate.getCurrent())
   * }
   *
   * heartRate.onCurrentChange(callback)
   *
   * // When not needed for use
   * heartRate.offCurrentChange(callback)
   * ```
   */
  class HeartRate {
    /**
     * @zh 获取最近一次心率持续测量的测量值，此方法需要在 `onCurrentChange` 回调函数中使用，注册 `onCurrentChange` 事件后，设备会开启心率持续测量，以一定频率更新心率持续测量的测量值
     * @en Get the current heart rate measurement, this method needs to be used in the `onCurrentChange` callback function
     */
    getCurrent(): number
    /**
     * @zh 获取最近一次的心率测量值。设备心率自动监测会更新心率测量值，注册 `onCurrentChange` 后设备开始持续测量心率，也会更新心率测量值
     * @en Get the most recent heart rate measurement (single measurement or heart rate monitoring measurement, continuous heart rate measurement `onCurrentChange` results are not counted)
     */
    getLast(): number
    /**
     * @zh 获取当日自 0 时起至当前时刻以分钟计的心率测量值数据，数组最长为 60*24
     * @en Get the heart rate measurement data in minutes from 0:00 to the current moment of the day, the longest array is 60*24
     */
    getToday(): Array<number>
    /**
     * @zh 调用此方法后设备开始心率持续测量，并注册回调函数，当有测量结果时调用回调函数，在回调函数中调用 `getCurrent` 方法可以获取心率持续测量的测量值，如需停止持续心率测量，需要调用 `offCurrentChange` 方法
     * @en Call this method and start measuring heart rate continuously, call the callback function when there is a measurement result, call the `getCurrent` method in the callback function to get the heart rate measurement value, if you want to stop the heart rate measurement, you need to call the `offCurrentChange` method
     * @version 2.1
     */
    onCurrentChange(callback: () => void): void
    /**
     * @zh 取消持续心率测量，并取消回调函数监听
     * @en Cancel continuous heart rate measurement and cancel callback function listeners
     * @version 2.1
     */
    offCurrentChange(callback: () => void): void
    /**
     * @zh 注册心率测量值变化事件回调函数
     * @en Register the heart rate single measurement change event callback function
     * @version 2.1
     */
    onLastChange(callback: () => void): void
    /**
     * @zh 取消心率测量值变化事件回调函数
     * @en Cancel the heart rate single measurement change event callback function
     * @version 2.1
     */
    offLastChange(callback: () => void): void
    /**
     * @zh 获取心率日统计数据
     * @en Get daily heart rate statistics
     * @version 3.0
     */
    getDailySummary(): HeartRate.getDailySummary.Result
    /**
     * @zh 获取当前静息心率
     * @en Get current resting heart rate
     * @version 3.0
     */
    getResting(): number
    /**
     * @zh 获取房颤数据数组
     * @en Get Atrial Fibrillation Data Array
     * @version 3.0
     */
    getAFibRecord(): HeartRate.getAFibRecord.Result
    /**
     * @zh 调用此方法后设备开始实时静息心率测量，并注册回调函数，当有测量结果时调用回调函数，在回调函数中调用 `getResting` 方法可以获取静息心率测量值，如需停止静息心率测量，需要调用 `offRestingChange` 方法
     * @en After calling this method, the device starts real-time resting heart rate measurement and registers a callback function, which is called when there is a measurement result, in which the `getResting` method can be called to get the resting heart rate measurement value, and if you need to stop the resting heart rate measurement, you need to call the `offRestingChange` method
     * @version 3.0
     */
    onRestingChange(callback: () => void): void
    /**
     * @zh 取消静息心率持续测量，并取消回调函数监听
     * @en Cancel continuous resting heart rate measurement and cancel callback function listeners
     * @version 3.0
     */
    offRestingChange(callback: () => void): void
  }
  /**
   * @zh PAI 传感器
   * @en PAI Sensor
   * @permissionCode data:user.hd.pai
   * @example
   * ```js
   * import { Pai } from 'zeppos-cross-api/sensor'
   *
   * const pai = new Pai()
   * const total = pai.getTotal()
   * const today = pai.getToday()
   * const lastWeek = pai.getLastWeek()
   * ```
   */
  class Pai {
    /**
     * @zh 获取当前累计的 PAI 值
     * @en Get the current cumulative PAI value
     */
    getTotal(): number
    /**
     * @zh 获取今日获取的 PAI 值
     * @en Get the PAI values obtained today
     */
    getToday(): number
    /**
     * @zh 获取一周的 PAI 数据，返回值为长度为 `7` 的数组，数组索引 `0` 的位置为今天的 PAI 值，索引 `1` 的位置为前 1 天的 PAI 值，以此类推
     * @en Get the PAI data for a week, the return value is an array of length `7`, the position of index `0` is the PAI value of today, the position of index `1` is the PAI value of the previous day, and so on
     */
    getLastWeek(): Array<number>
  }
  /**
   * @zh 里程传感器
   * @en Distance Sensor
   * @permissionCode data:user.hd.distance
   * @example
   * ```js
   * import { Distance } from 'zeppos-cross-api/sensor'
   *
   * const distance = new Distance()
   * const current = distance.getCurrent()
   * const callback = () => {
   *   console.log(distance.getCurrent())
   * }
   *
   * distance.onChange(callback)
   *
   * // When not needed for use
   * distance.offChange(callback)
   * ```
   */
  class Distance {
    /**
     * @zh 获取当前里程
     * @en Get the current distance
     */
    getCurrent(): number
    /**
     * @zh 注册里程变化事件监听回调函数
     * @en Register the distance change event callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消里程变化事件监听回调函数
     * @en Cancel the distance change event callback function
     */
    offChange(callback: () => void): void
  }
  /**
   * @zh 站立行为传感器
   * @en Standing behavior Sensor
   * @permissionCode data:user.hd.stand
   * @example
   * ```js
   * import { Stand } from 'zeppos-cross-api/sensor'
   *
   * const stand = new Stand()
   * const current = stand.getCurrent()
   * const target = stand.getTarget()
   * const callback = () => {
   *   console.log(stand.getCurrent())
   * }
   *
   * stand.onChange(callback)
   *
   * // When not needed for use
   * stand.offChange(callback)
   * ```
   */
  class Stand {
    /**
     * @zh 获取当前有站立行为的小时数
     * @en Get the current number of hours with standing behavior
     */
    getCurrent(): number
    /**
     * @zh 获取有站立行为目标的小时数
     * @en Get the number of hours with standing behavior targets
     */
    getTarget(): number
    /**
     * @zh 注册站立行为小时数变化事件监听回调函数
     * @en Register a callback function to listen for changes in the number of hours of standing behavior
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消站立行为小时数变化事件监听回调函数
     * @en Cancel a callback function to listen for changes in the number of hours of standing behavior
     */
    offChange(callback: () => void): void
  }
  /**
   * @zh 脂肪燃烧传感器
   * @en FatBurning Sensor
   * @permissionCode data:user.hd.fat_burning
   * @example
   * ```js
   * import { FatBurning } from 'zeppos-cross-api/sensor'
   *
   * const fatBurning = new FatBurning()
   * const current = fatBurning.getCurrent()
   * const target = fatBurning.getTarget()
   * const callback = () => {
   *   console.log(fatBurning.getCurrent())
   * }
   *
   * fatBurning.onChange(callback)
   *
   * // When not needed for use
   * fatBurning.offChange(callback)
   * ```
   */
  class FatBurning {
    /**
     * @zh 获取当前燃脂分钟数
     * @en Get current fat burning minutes
     */
    getCurrent(): number
    /**
     * @zh 获取当前燃脂目标分钟数
     * @en Get current fat burning target minutes
     */
    getTarget(): number
    /**
     * @zh 注册燃脂分钟数变化事件监听回调函数
     * @en Register a callback function to listen to the fat burning minutes change event
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消燃脂分钟数变化事件监听回调函数
     * @en Cancel a callback function to listen to the fat burning minutes change event
     */
    offChange(callback: () => void): void
  }
  namespace BloodOxygen {
    namespace getCurrent {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh 血氧测量值
         * @en Blood oxygen measurement values
         */
        value: number
        /**
         * @zh 测量时间
         * @en Measurement time
         */
        time: number
        /**
         * @zh 结果返回码，参考 retCode 描述
         * @en Result code, refer to retCode description
         */
        retCode: number
      }

      /**
       * @output
       * @enum
       */
      interface retCode {
        /**
         * @zh 测量无效
         * @en Measurement invalid
         */
        0: number
        /**
         * @zh 继续测量
         * @en Continue measuring
         */
        1: number
        /**
         * @zh 测量成功
         * @en Measurement success
         */
        2: number
        /**
         * @zh 测量失败
         * @en Measurement failure
         */
        3: number
        /**
         * @zh 没有佩戴
         * @en Not wearing
         */
        4: number
        /**
         * @zh 测量超时
         * @en Measurement timeout
         */
        5: number
        /**
         * @zh 无效佩戴
         * @en Invalid wearing
         */
        6: number
        /**
         * @zh 信号无效
         * @en Invalid signal
         */
        7: number
        /**
         * @zh 血氧值偏低
         * @en Low blood oxygen value
         */
        8: number
        /**
         * @zh 血氧值偏高
         * @en High blood oxygen value
         */
        9: number
        /**
         * @zh 测量无效
         * @en Measurement invalid
         */
        10: number
      }
    }

    namespace getLastFewHour {
      /**
       * @output
       */
      interface Data {
        /**
         * @zh 血氧测量值
         * @en Blood oxygen measurement value
         */
        spo2: number
        /**
         * @zh 血氧值的测量时间，单位秒
         * @en Time of measurement of blood oxygen values, UTC time stamp in seconds
         */
        time: number
      }
    }
  }
  /**
   * @zh 血氧传感器
   * @en Blood oxygen Sensor
   * @permissionCode data:user.hd.spo2
   * @example
   * ```js
   * import { BloodOxygen } from 'zeppos-cross-api/sensor'
   *
   * const bloodOxygen = new BloodOxygen()
   * const { value } = bloodOxygen.getCurrent()
   * const lastDay = bloodOxygen.getLastDay()
   * const callback = () => {
   *   console.log(bloodOxygen.getCurrent())
   * }
   *
   * bloodOxygen.onChange(callback)
   * bloodOxygen.stop()
   * bloodOxygen.start()
   * // When not needed for use
   * bloodOxygen.offChange(callback)
   * ```
   */
  class BloodOxygen {
    /**
     * @zh 获取当前测量的血氧结果
     * @en Get the current measured blood oxygen result
     */
    getCurrent(): BloodOxygen.getCurrent.Result
    /**
     * @zh 返回过去 24 小时平均血氧数据，数组长度为 24
     * @en Returns the average blood sample data for the past 24 hours, with an array length of 24
     */
    getLastDay(): Array<number>
    /**
     * @zh 开始血氧测量，建议在调用 `start` 方法前，调用 `stop` 来停止上一次测量
     * @en Start blood oxygen measurement, it is recommended to call `stop` to stop the last measurement before calling the `start` method
     * @version 2.1
     */
    start(): void
    /**
     * @zh 停止血氧测量
     * @en Cancel blood oxygen measurement
     * @version 2.1
     */
    stop(): void
    /**
     * @zh 注册血氧测量值变化事件监听回调函数
     * @en Register a callback function to listen for blood oxygen measurement change events
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消血氧测量值变化事件监听回调函数
     * @en Cancel a callback function to listen for blood oxygen measurement change events
     */
    offChange(callback: () => void): void
    /**
     * @zh 获取最近 `hour` 个小时的血氧测量数据，结果按照时间顺序排序
     * @en Obtain blood oxygen measurements for the last `hour` and sort the results in chronological order
     * @version 3.0
     */
    getLastFewHour(hour: number): Array<BloodOxygen.getLastFewHour.Data>
  }
  namespace Stress {
    namespace getCurrent {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh 压力测量值
         * @en Stress measurement values
         */
        value: number
        /**
         * @zh 得出测量值的时间
         * @en Time to obtain the measured value
         */
        time: number
      }
    }

    namespace getToday {
      /**
       * @output
       */
      interface StressInfo {
        /**
         * @zh 压力值测量时间，UTC 时间戳，单位秒
         * @en Pressure value measurement time, UTC time stamp, in seconds
         */
        second: number
        /**
         * @zh 压力值，`0` 代表无效
         * @en Pressure value, `0` means invalid
         */
        stress: number
      }
    }

    namespace getLastWeekByHour {
      /**
       * @output
       */
      interface StressInfo {
        /**
         * @zh 压力值测量时间，UTC 时间戳，单位秒
         * @en Pressure value measurement time, UTC time stamp, in seconds
         */
        second: number
        /**
         * @zh 压力值，`0` 代表无效
         * @en Pressure value, `0` means invalid
         */
        stress: number
      }
    }
  }
  /**
   * @zh 压力传感器
   * @en Stress Sensor
   * @permissionCode data:user.hd.stress
   * @example
   * ```js
   * import { Stress } from 'zeppos-cross-api/sensor'
   *
   * const stress = new Stress()
   * const { value } = stress.getCurrent()
   *
   * const callback = () => {
   *   console.log(stress.getCurrent())
   * }
   *
   * stress.onChange(callback)
   *
   * // When not needed for use
   * stress.offChange(callback)
   * ```
   */
  class Stress {
    /**
     * @zh 获取当前压力测量值
     * @en Get the current pressure measurement
     */
    getCurrent(): Stress.getCurrent.Result
    /**
     * @zh 注册压力测量值变化事件监听回调函数
     * @en Register a callback function to listen for stress measurement change events
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消压力测量值变化事件监听回调函数
     * @en Cancel a callback function to listen for stress measurement change events
     */
    offChange(callback: () => void): void
    /**
     * @zh 获取全天的压力测量值，每分钟记录一次，返回值为不定长数组，数组长度最大 24 * 60
     * @en Get the pressure measurements for the whole day, recorded every minute, the return value is an array of variable length, the maximum length of the array is 24 * 60
     * @version 3.0
     */
    getToday(): Array<number>
    /**
     * @zh 获取全天的压力均值，返回值为定长数组，为每小时的平均压力，数组长度为 24
     * @en Get the average pressure value for the whole day, the return value is a fixed-length array, the average pressure for each hour, the length of the array is 24
     * @version 3.0
     */
    getTodayByHour(): Array<number>
    /**
     * @zh 获取过去一周每天的压力均值，返回值为定长数组，为每天平均压力，数组长度为 7，索引 0 的位置代表六天前，索引 6 的位置代表今天
     * @en Get the average pressure value for each day of the past week, the return value is a fixed-length array, the average pressure per day, the length of the array is 7, the position of index 0 represents six days ago, the position of index 6 represents today
     * @version 3.0
     */
    getLastWeek(): Array<number>
    /**
     * @zh 获取过去一周每小时的压力平均值，返回值为定长数组，数组长度为 7 * 24
     * @en Get the hourly pressure average for the past week, the return value is a fixed-length array, the length of the array is 7 * 24
     * @version 3.0
     */
    getLastWeekByHour(): Array<Stress.getLastWeekByHour.StressInfo>
  }
  /**
   * @zh 佩戴状态传感器
   * @en Wearing status sensor
   * @example
   * ```js
   * import { Wear } from 'zeppos-cross-api/sensor'
   *
   * const wear = new Wear()
   * const status = wear.getStatus()
   * const callback = () => {
   *   console.log(wear.getStatus())
   * }
   *
   * wear.onChange(callback)
   *
   * // When not needed for use
   * wear.offChange(callback)
   * ```
   */
  class Wear {
    /**
     * @zh 获取当前设备佩戴状态，`0`：未佩戴、`1`：佩戴、`2`：运动中、`3`：不确定
     * @en Get the current device wearing status, `0`: not wearing, `1`: wearing, `2`: in motion, `3`: not sure
     */
    getStatus(): number
    /**
     * @zh 注册设备佩戴状态变化事件监听回调函数
     * @en Register the device wear status change event listening callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消设备佩戴状态变化事件监听回调函数
     * @en Cancel the device wear status change event listening callback function
     */
    offChange(callback: () => void): void
  }
  namespace Sleep {
    namespace getInfo {
      /**
       * @output
       */
      interface SleepInfo {
        /**
         * @zh 睡眠得分
         * @en Sleep score
         */
        score: number
        /**
         * @zh 深睡眠时间（分钟）
         * @en Deep sleep time (minutes)
         */
        deepTime: number
        /**
         * @zh 睡眠起始时间，基于当天 0 点的分钟数
         * @en Sleep onset time, based on the number of minutes at 0:00 of the day
         */
        startTime: number
        /**
         * @zh 睡眠结束时间，基于当天 0 点的分钟数
         * @en Sleep end time, based on the number of minutes at 0:00 of the day
         */
        endTime: number
        /**
         * @zh 获取睡眠总时间（分钟）
         * @en Get total sleep time (minutes)
         */
        totalTime: number
      }
    }

    namespace getStageConstantObj {
      /**
       * @output
       */
      interface StageConstants {
        /**
         * @zh 清醒阶段
         * @en Awake stage
         */
        WAKE_STAGE: number
        /**
         * @zh REM 阶段
         * @en Deep sleep time (minutes)
         */
        REM_STAGE: number
        /**
         * @zh 浅睡眠阶段
         * @en Light Sleep stage
         */
        LIGHT_STAGE: number
        /**
         * @zh 深睡眠阶段
         * @en Deep Sleep stage
         */
        DEEP_STAGE: number
      }
    }

    namespace getStage {
      /**
       * @output
       */
      interface StageInfo {
        /**
         * @zh 睡眠阶段类型，值的含义参考 `getStageConstantObj` 返回的常量
         * @en Sleep stage type, refer to the constants returned by `getStageConstantObj` for the meaning of the value
         */
        model: number
        /**
         * @zh 睡眠阶段起始时间，基于当天 0 点的分钟数
         * @en Sleep stage onset time, based on the number of minutes at 0:00 of the day
         */
        start: number
        /**
         * @zh 睡眠阶段结束时间，基于当天 0 点的分钟数
         * @en Sleep stage end time, based on the number of minutes at 0:00 of the day
         */
        stop: number
      }
    }

    namespace getNap {
      /**
       * @output
       */
      interface NapInfo {
        /**
         * @zh 小睡时长（分钟）
         * @en Nap duration (minutes)
         */
        length: number
        /**
         * @zh 小睡起始时间，基于当天 0 点的分钟数
         * @en Nap start time, based on the number of minutes at 0:00 of the day
         */
        start: number
        /**
         * @zh 小睡结束时间，基于当天 0 点的分钟数
         * @en Nap end time, based on the number of minutes at 0:00 of the day
         */
        stop: number
      }
    }
  }

  /**
   * @zh 睡眠传感器
   * @en Sleep Sensor
   * @permissionCode data:user.hd.sleep
   * @example
   * ```js
   * import { Sleep } from 'zeppos-cross-api/sensor'
   *
   * const sleep = new Sleep()
   * const { score } = sleep.getInfo()
   * const sleepStageConstants = sleep.getStageConstantObj()
   * const stage = sleep.getStage()
   *
   * stage.forEach((i) => {
   *   const { model } = i
   *
   *   if (model === sleepStageConstants.WAKE_STAGE) {
   *     console.log('This stage is awake stage')
   *   }
   * })
   * ```
   */
  class Sleep {
    /**
     * @zh 系统默认每 `30` 分钟更新一次睡眠数据,`updateInfo` 方法用来主动触发更新睡眠数据
     * @en By default, the system updates the sleep data every `30` minutes, the `updateInfo` method is used to actively trigger the update of the sleep data
     */
    updateInfo(): void
    /**
     * @zh 获取睡眠信息
     * @en Get sleep information
     */
    getInfo(): Sleep.getInfo.SleepInfo
    /**
     * @zh 获取睡眠阶段的常量值，用于在 `getSleepStageData` 返回值中判断睡眠阶段
     * @en Get the constant value of the sleep stage, used to determine the sleep stage in the `getSleepStageData` return value
     */
    getStageConstantObj(): Sleep.getStageConstantObj.StageConstants
    /**
     * @zh 获取睡眠分阶段数据
     * @en Get Sleep Staging Data
     */
    getStage(): Array<Sleep.getStage.StageInfo>
    /**
     * @zh 获取当前睡眠状态，`0` 醒着，`1` 正在睡眠
     * @en Get the current sleep state, 0 'awake, 1' sleeping
     * @version 3.0
     */
    getSleepingStatus(): number
    /**
     * @zh 获取零星小睡数据
     * @en Get nap data
     * @version 3.0
     */
    getNap(): Array<Sleep.getNap.NapInfo>
  }
  namespace Weather {
    namespace getForecastWeather {
      /**
       * @output
       */
      interface ForecastWeather {
        /**
         * @zh 城市名称
         * @en City Name
         */
        cityName: string
        /**
         * @zh 天气信息
         * @en Weather Information
         */
        forecastData: ForecastData
        /**
         * @zh 潮汐信息
         * @en Tide Information
         */
        tideData: TideData
      }

      /**
       * @output
       */
      interface ForecastData {
        /**
         * @zh 天气信息数组，索引 0 位置代表当天
         * @en Weather Information Array, index 0 position represents the day
         */
        data: Array<ForecastDataItem>
        /**
         * @zh 天气信息数组长度
         * @en The length of Weather Information Array
         */
        count: number
      }

      /**
       * @output
       */
      interface ForecastDataItem {
        /**
         * @zh 最高温度
         * @en Maximum temperature
         */
        high: number
        /**
         * @zh 最低温度
         * @en Lowest temperature
         */
        low: number
        /**
         * @zh 天气的索引值，值描述详见下方 `index`
         * @en The index value of the weather, see `index` below for a description of the value
         */
        index: number
      }

      /**
       * @output
       * @enum
       */
      interface index {
        /**
         * @zh 多云
         * @en Cloudy
         */
        0: number
        /**
         * @zh 阵雨
         * @en Showers
         */
        1: number
        /**
         * @zh 阵雪
         * @en Snow Showers
         */
        2: number
        /**
         * @zh 晴
         * @en Sunny
         */
        3: number
        /**
         * @zh 阴
         * @en Overcast
         */
        4: number
        /**
         * @zh 小雨
         * @en Light Rain
         */
        5: number
        /**
         * @zh 小雪
         * @en Light Snow
         */
        6: number
        /**
         * @zh 中雨
         * @en Moderate Rain
         */
        7: number
        /**
         * @zh 中雪
         * @en Moderate Snow
         */
        8: number
        /**
         * @zh 大雪
         * @en Heavy Snow
         */
        9: number
        /**
         * @zh 大雨
         * @en Heavy Rain
         */
        10: number
        /**
         * @zh 沙尘暴
         * @en Sandstorm
         */
        11: number
        /**
         * @zh 雨夹雪
         * @en Rain and Snow
         */
        12: number
        /**
         * @zh 雾
         * @en Fog
         */
        13: number
        /**
         * @zh 霾
         * @en Hazy
         */
        14: number
        /**
         * @zh 雷阵雨
         * @en T-Storms
         */
        15: number
        /**
         * @zh 暴雪
         * @en Snowstorm
         */
        16: number
        /**
         * @zh 浮尘
         * @en Floating dust
         */
        17: number
        /**
         * @zh 特大暴雨
         * @en Very Heavy Rainstorm
         */
        18: number
        /**
         * @zh 雨加冰雹
         * @en Rain and Hail
         */
        19: number
        /**
         * @zh 雷阵雨伴有冰雹
         * @en T-Storms and Hail
         */
        20: number
        /**
         * @zh 大暴雨
         * @en Heavy Rainstorm
         */
        21: number
        /**
         * @zh 扬尘
         * @en Dust
         */
        22: number
        /**
         * @zh 强沙尘暴
         * @en Heavy sand storm
         */
        23: number
        /**
         * @zh 暴雨
         * @en Rainstorm
         */
        24: number
        /**
         * @zh 未知天气
         * @en Unknown
         */
        25: number
        /**
         * @zh 夜间多云
         * @en Cloudy Nighttime
         */
        26: number
        /**
         * @zh 夜间阵雨
         * @en Showers Nighttime
         */
        27: number
        /**
         * @zh 夜间晴
         * @en Sunny Nighttime
         */
        28: number
      }

      /**
       * @output
       */
      interface TideData {
        /**
         * @zh 潮汐信息数组，索引 0 位置代表当天
         * @en Tide Information Array, index 0 position represents the day
         */
        data: Array<TideDataItem>
        /**
         * @zh 潮汐信息数组长度
         * @en The length of Tide Information Array
         */
        count: number
      }

      /**
       * @output
       */
      interface TideDataItem {
        /**
         * @zh 日出时间
         * @en Sunrise time
         */
        sunrise: Sunrise
        /**
         * @zh 日落时间
         * @en Sunset time
         */
        sunset: Sunset
      }

      /**
       * @output
       */
      interface Sunrise {
        /**
         * @zh 日出时间 - 小时
         * @en Sunrise time - hour
         */
        hour: number
        /**
         * @zh 日出时间 - 分钟
         * @en Sunrise time - minute
         */
        minute: number
      }

      /**
       * @output
       */
      interface Sunset {
        /**
         * @zh 日落时间 - 小时
         * @en Sunrise time - hour
         */
        hour: number
        /**
         * @zh 日落时间 - 分钟
         * @en Sunrise time - minute
         */
        minute: number
      }
    }
  }

  /**
   * @zh 天气预报传感器
   * @en Weather Forecasts sensor
   * @deprecated https://github.com/orgs/zepp-health/discussions/83
   * @example
   * ```js
   * import { Weather } from 'zeppos-cross-api/sensor'
   *
   * const weather = new Weather()
   * const { forecastData, tideData, cityName } = weather.getForecast()
   *
   * console.log(cityName)
   *
   * for (let i = 0; i < forecastData.count; i++) {
   *   const element = forecastData.data[i]
   *   console.log('Index' + element.index)
   *   console.log('Highest temperature' + element.high)
   *   console.log('Lowest temperature' + element.low)
   * }
   *
   * for (let i = 0; i < tideData.count; i++) {
   *   const element = tideData.data[i]
   *   console.log('Sunrise' + element.sunrise.hour + element.sunrise.minute)
   *   console.log('Sunset' + element.sunset.hour + element.sunset.minute)
   * }
   * ```
   */
  class Weather {
    /**
     * @zh 获取天气预报数据
     * @en Get weather forecast data
     */
    getForecastWeather(): Weather.getForecastWeather.ForecastWeather
  }
  namespace Vibrator {
    namespace start {
      interface Option {
        /**
         * @zh 振动模式，值参考振动马达模式常量
         * @en Vibration mode, Value refer to Vibration motor mode constants
         * @defaultValue VIBRATOR_SCENE_SHORT_MIDDLE
         */
        mode?: number
      }
    }

    namespace setMode {
      interface Option {
        /**
         * @zh 振动模式，值参考振动马达模式常量
         * @en Vibration mode, Value refer to Vibration motor mode constants
         */
        mode: number
      }
    }

    namespace getConfig {
      /**
       * @output
       */
      interface Option {
        /**
         * @zh 振动模式，值参考振动马达模式常量
         * @en Vibration mode, Value refer to Vibration motor mode constants
         */
        mode: number
      }
    }
  }

  /**
   * @zh 振动马达
   * @en Vibrator
   * @example
   * ```js
   * import { Vibrator, VIBRATOR_SCENE_DURATION } from 'zeppos-cross-api/sensor'
   *
   * const vibrator = new Vibrator()
   * vibrator.start()
   *
   * // set scene
   * vibrator.setMode(VIBRATOR_SCENE_DURATION)
   * vibrator.start()
   * ```
   */
  class Vibrator {
    /**
     * @zh 开始振动，传入的 `option` 参数，只对此次振动生效
     * @en Start vibration, if the `option` parameter is passed, it will only work for this vibration
     * @constants vibrator_scene
     */
    start(option?: Vibrator.start.Option): void
    /**
     * @zh 停止振动
     * @en Stop vibration
     */
    stop(): void
    /**
     * @zh 设置振动模式，设置成功后调用 `start()`，会依照设置的模式进行振动
     * @en Set the vibration mode, call `start()` after successful setting, it will vibrate according to the set mode
     */
    setMode(option: Vibrator.setMode.Option): void
    /**
     * @zh 获取振动马达配置
     * @en Get Vibration Motor Configuration
     */
    getConfig(): Vibrator.getConfig.Option
  }
  /**
   * @zh 气压高度传感器
   * @en Barometer Sensor
   * @permissionCode device:os.barometer
   * @version 2.1
   * @example
   * ```js
   * import { Barometer } from 'zeppos-cross-api/sensor'
   *
   * const barometer = new Barometer()
   * const airPressure = barometer.getAirPressure()
   * const altitude = barometer.getAltitude()
   *
   * const callback = () => {
   *   console.log(barometer.getAltitude())
   * }
   *
   * barometer.onChange(callback)
   *
   * // When not needed for use
   * barometer.offChange(callback)
   * ```
   */
  class Barometer {
    /**
     * @zh 获取气压值，单位百帕
     * @en Get air pressure value in hPa
     */
    getAirPressure(): number
    /**
     * @zh 获取海拔高度值，单位米
     * @en Get altitude value in meters
     */
    getAltitude(): number
    /**
     * @zh 注册气压和海拔变化事件监听回调函数
     * @en Register the air pressure and altitude change event callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消气压和海拔变化事件监听回调函数
     * @en Cancel the air pressure and altitude change event callback function
     */
    offChange(callback: () => void): void
  }
  namespace Geolocation {
    namespace getLatitude {
      interface Option {
        /**
         * @zh 坐标格式，可选 `DD` 代表十进制或者 `DMS` 度分秒的形式
         * @en Coordinate format, optionally `DD` for decimal or `DMS` in degrees, minutes and seconds
         * @defaultValue DMS
         */
        format?: string
      }

      /**
       * @zh 坐标，坐标系类型 WGS-84
       * @en Coordinates, coordinate system type WGS-84
       */
      type Result = number | DMS

      /**
       * @output
       */
      interface DMS {
        /**
         * @zh 方向，`N` 代表北纬，`S` 代表南纬
         * @en Direction, `N` for north latitude, `S` for south latitude
         */
        direction: string
        /**
         * @zh 度
         * @en degree
         */
        degrees: number
        /**
         * @zh 分
         * @en minute
         */
        minutes: number
        /**
         * @zh 秒
         * @en second
         */
        seconds: number
      }
    }

    namespace getLongitude {
      interface Option {
        /**
         * @zh 坐标格式，可选 `DD` 代表十进制或者 `DMS` 度分秒的形式
         * @en Coordinate format, optionally `DD` for decimal or `DMS` in degrees, minutes and seconds
         * @defaultValue DMS
         */
        format?: string
      }

      /**
       * @zh 坐标，坐标系类型 WGS-84
       * @en Coordinates, coordinate system type WGS-84
       */
      type Result = number | DMS

      /**
       * @output
       */
      interface DMS {
        /**
         * @zh 方向，`E` 代表东经，`W` 代表西经
         * @en Direction, `E` for east longitude, `W` for west longitude
         */
        direction: string
        /**
         * @zh 度
         * @en degree
         */
        degrees: number
        /**
         * @zh 分
         * @en minute
         */
        minutes: number
        /**
         * @zh 秒
         * @en second
         */
        seconds: number
      }
    }

    namespace getSetting {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh 定位设置，值描述详见下方 `mode`
         * @en Positioning settings, see `mode` below for value descriptions
         */
        mode: number
      }

      /**
       * @output
       * @enum
       */
      interface mode {
        /**
         * @zh 精准模式
         * @en Accuracy
         */
        0: number
        /**
         * @zh 智能模式
         * @en Automation
         */
        1: number
        /**
         * @zh 均衡模式
         * @en Balance
         */
        2: number
        /**
         * @zh 省电模式
         * @en Power Saving
         */
        3: number
        /**
         * @zh 超级省电模式
         * @en Super Power Saving
         */
        4: number
        /**
         * @zh 自定义模式
         * @en Custom
         */
        5: number
      }
    }

    namespace onGnssChange {
      /**
       * @output
       */
      interface Info {
        /**
         * @zh AGPS 更新时间 UTC 时间戳，单位毫秒
         * @en AGPS update time UTC timestamp in milliseconds
         */
        agps_inject_time: number
        /**
         * @zh 定位卫星的信号强度值
         * @en Signal strength value of the positioning satellite
         */
        top4_cn_val: number
        /**
         * @zh 是否双频
         * @en Whether dual-band
         */
        is_dualband: number
        /**
         * @zh 可用卫星数量
         * @en Number of available satellites
         */
        nb_valid_satellite: number
        /**
         * @zh 使用的卫星数量
         * @en Number of satellites used
         */
        nb_used_satellite: number
        /**
         * @zh 从搜索卫星开始到定位成功所消耗的时间，单位秒
         * @en Time consumed from the start of satellite search to successful positioning, in seconds
         */
        elapsed_time: number
        /**
         * @zh 卫星数据数组
         * @en Satellite data arrays
         */
        satellite_data: Array<SatelliteSystem>
      }

      /**
       * @output
       */
      interface SatelliteSystem {
        /**
         * @zh 卫星 ID
         * @en Satellite ID
         */
        gnss_id: number
        /**
         * @zh 该卫星系统的最强信号值
         * @en The strongest signal value of this satellite system
         */
        sub_top4_cn_val: number
        /**
         * @zh 搜索到可用卫星数量
         * @en Number of available satellites that can be searched
         */
        nb_valid_satellite: number
        /**
         * @zh 单颗卫星数据数组，最大长度 32
         * @en Single satellite data array, maximum length 32
         */
        gsv_data: Array<Satellite>
      }

      /**
       * @output
       */
      interface Satellite {
        /**
         * @zh 卫星 ID
         * @en Satellite ID
         */
        id: number
        /**
         * @zh 俯仰角
         * @en Pitch angle
         */
        elevation: number
        /**
         * @zh 方位角
         * @en Azimuth
         */
        azimuth: number
        /**
         * @zh 信噪比
         * @en Signal-to-noise ratio
         */
        snr: number
      }
    }
  }

  /**
   * @zh 定位传感器
   * @en Geolocation Sensor
   * @permissionCode device:os.geolocation
   * @version 2.1
   * @example
   * ```js
   * import { Geolocation } from 'zeppos-cross-api/sensor'
   *
   * const geolocation = new Geolocation()
   *
   * const callback = () => {
   *   if (geolocation.getStatus() === 'A') {
   *     console.log(geolocation.getLatitude())
   *     console.log(geolocation.getLongitude())
   *   }
   * }
   *
   * geolocation.start()
   * geolocation.onChange(callback)
   *
   * // When not needed for use
   * geolocation.offChange(callback)
   * geolocation.stop()
   * ```
   */
  class Geolocation {
    /**
     * @zh 开始监听定位数据
     * @en Start listening to location data
     */
    start(): void
    /**
     * @zh 停止监听定位数据
     * @en Stop listening to location data
     */
    stop(): void
    /**
     * @zh 获取定位状态，返回 `A` 代表定位中，返回 `V` 代表无效定位
     * @en Get the positioning status, return `A` for positioning in progress, return `V` for invalid positioning
     */
    getStatus(): string
    /**
     * @zh 获取纬度
     * @en Get Latitude
     */
    getLatitude(option: Geolocation.getLatitude.Option): Geolocation.getLatitude.Result
    /**
     * @zh 获取经度
     * @en Get Longitude
     */
    getLongitude(option: Geolocation.getLongitude.Option): Geolocation.getLongitude.Result
    /**
     * @zh 获取定位设置
     * @en Get the positioning settings
     * @version 3.0
     */
    getSetting(): Geolocation.getSetting.Result
    /**
     * @zh 注册定位信息变化事件监听回调函数
     * @en Register a callback function to listen for location information change events
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消定位信息变化事件监听回调函数
     * @en Cancel the callback function for listening to the location information change event
     */
    offChange(callback: () => void): void
    /**
     * @zh 注册 GNSS 信息变化事件监听回调函数
     * @en Register a callback function to listen for GNSS information change events
     * @version 3.0
     */
    onGnssChange(callback: (info: Geolocation.onGnssChange.Info) => void): void
    /**
     * @zh 取消 GNSS 信息变化事件监听回调函数
     * @en Cancel the callback function for listening to the GNSS information change event
     * @version 3.0
     */
    offGnssChange(callback: (...args: any[]) => any): void
  }
  namespace Workout {
    namespace getStatus {
      /**
       * @output
       */
      interface Status {
        /**
         * @zh 最大摄氧量
         * @en VO2 Max
         */
        vo2Max: number
        /**
         * @zh 运动负荷
         * @en Training Load
         */
        trainingLoad: number
        /**
         * @zh 完全恢复时间
         * @en Full Recovery Time
         */
        fullRecoveryTime: number
      }
    }

    namespace getHistory {
      /**
       * @output
       */
      interface History {
        /**
         * @zh 运动开始时间
         * @en Workout start time
         */
        startTime: number
        /**
         * @zh 时长，单位秒
         * @en Duration of workout in seconds
         */
        duration: number
      }
    }
  }

  /**
   * @zh 运动记录传感器
   * @en Workout Sensor
   * @permissionCode data:user.hd.workout
   * @version 3.0
   * @example
   * ```js
   * import { Workout } from 'zeppos-cross-api/sensor'
   *
   * const workout = new Workout()
   *
   * const status = workout.getStatus()
   * const history = workout.getHistory()
   * ```
   */
  class Workout {
    /**
     * @zh 获取运动状态
     * @en Get altitude value in meters
     */
    getStatus(): Workout.getStatus.Status
    /**
     * @zh 获取运动记录时长
     * @en Get the duration of the workout record
     */
    getHistory(): Array<Workout.getHistory.History>
  }
  namespace WorldClock {
    namespace getInfo {
      /**
       * @output
       */
      interface WorldClockInfo {
        /**
         * @zh 城市名
         * @en City Name
         */
        city: string
        /**
         * @zh 城市代号，如旧金山 `SFO`
         * @en City code, e.g. San Francisco `SFO`
         */
        cityCode: string
        /**
         * @zh 小时
         * @en Hour
         */
        hour: number
        /**
         * @zh 分钟
         * @en Minute
         */
        minute: number
        /**
         * @zh 时区小时
         * @en Time Zone hours
         */
        timeZoneHour: number
        /**
         * @zh 时区分钟
         * @en Time zone minutes
         */
        timeZoneMinute: number
      }
    }
  }

  /**
   * @zh 世界时钟传感器
   * @en World Clock Sensor
   * @version 3.0
   * @example
   * ```js
   * import { WorldClock } from 'zeppos-cross-api/sensor'
   *
   * const worldClock = new WorldClock()
   * const worldClockCount = worldClock.getCount()
   *
   * for (let i = 0; i < worldClockCount; i++) {
   *   const worldClockInfo = worldClock.getInfo(i)
   *   console.log(worldClockInfo.city)
   *   console.log(worldClockInfo.cityCode)
   *   console.log(worldClockInfo.hour)
   *   console.log(worldClockInfo.minute)
   *   console.log(worldClockInfo.timeZoneHour)
   *   console.log(worldClockInfo.timeZoneMinute)
   * }
   *
   * // When not needed for use
   * worldClock.destroy()
   * ```
   */
  class WorldClock {
    /**
     * @zh 获取配置的世界时钟数量
     * @en Get the number of configured world clocks
     */
    getCount(): number
    /**
     * @zh 根据索引获取配置的世界时钟信息
     * @en Get the configured world clock information according to the index
     */
    getInfo(index: number): WorldClock.getInfo.WorldClockInfo
  }
  namespace Compass {
    namespace getDirection {
      /**
       * @output
       * @enum
       */
      interface direction {
        /**
         * @zh 北
         * @en North
         */
        N: string
        /**
         * @zh 东北
         * @en Northeast
         */
        NE: string
        /**
         * @zh 东
         * @en East
         */
        E: string
        /**
         * @zh 东南
         * @en Southeast
         */
        SE: string
        /**
         * @zh 南
         * @en South
         */
        S: string
        /**
         * @zh 西南
         * @en Southwest
         */
        SW: string
        /**
         * @zh 西
         * @en West
         */
        W: string
        /**
         * @zh 西北
         * @en Northwest
         */
        NW: string
      }
    }
  }

  /**
   * @zh 指南针
   * @en compass
   * @permissionCode device:os.compass
   * @version 3.0
   * @example
   * ```js
   * import { Compass } from 'zeppos-cross-api/sensor'
   *
   * const compass = new Compass()
   *
   * const callback = () => {
   *   if (compass.getStatus()) {
   *     console.log(compass.getDirection())
   *     console.log(compass.getDirectionAngle())
   *   }
   * }
   * compass.onChange(callback)
   * compass.start()
   *
   * // When not needed for use
   * compass.offChange()
   * compass.stop()
   * ```
   */
  class Compass {
    /**
     * @zh 开始监听指南针数据
     * @en Start listening to compass data
     */
    start(): void
    /**
     * @zh 停止监听指南针数据
     * @en Stop listening to compass data
     */
    stop(): void
    /**
     * @zh 获取指南针校准状态，`true` 代表已校准
     * @en Get the compass calibration status, `true` means calibrated
     */
    getStatus(): boolean
    /**
     * @zh 获取当前手表 12 点刻度的方向指向，一共分为八个方向，参考 `direction`
     * @en Get the direction of the current watch's 12-point scale, divided into eight directions, refer to `direction`
     */
    getDirection(): string
    /**
     * @zh 获取当前方向角，手表 12 点刻度方向相对正北方向的顺时针旋转角度，取值 0 - 360，如果指南针未校准，返回 `INVALID` 字符串
     * @en Get the current direction angle, the clockwise rotation angle of the watch's 12 o'clock scale direction relative to due north, takes the values 0 - 360, if the compass is not calibrated, returns the `INVALID` string
     */
    getDirectionAngle(): number | 'INVALID'
    /**
     * @zh 注册指南针方向变化事件监听回调函数
     * @en Register the compass direction change event listener callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消指南针方向变化事件监听回调函数
     * @en Cancel the compass direction change event listener callback function
     */
    offChange(callback: () => void): void
  }
  namespace Gyroscope {
    namespace getCurrent {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh x 轴的角速度，单位 DPS，度数/秒
         * @en Angular velocity of x-axis in DPS, degrees per second
         */
        x: number
        /**
         * @zh y 轴的角速度，单位 DPS，度数/秒
         * @en Angular velocity of y-axis in DPS, degrees per second
         */
        y: number
        /**
         * @zh z 轴的角速度，单位 DPS，度数/秒
         * @en Angular velocity of z-axis in DPS, degrees per second
         */
        z: number
      }
    }
  }

  /**
   * @zh 陀螺仪
   * @en gyroscope
   * @permissionCode device:os.gyroscope
   * @version 3.0
   * @example
   * ```js
   * import { Gyroscope } from 'zeppos-cross-api/sensor'
   *
   * const gyroscope = new Gyroscope()
   *
   * const callback = () => {
   *   console.log(gyroscope.getCurrent())
   * }
   * gyroscope.onChange(callback)
   * gyroscope.start()
   *
   * // When not needed for use
   * gyroscope.offChange()
   * gyroscope.stop()
   * ```
   */
  class Gyroscope {
    /**
     * @zh 开始监听陀螺仪数据
     * @en Start listening to gyroscope data
     */
    start(): void
    /**
     * @zh 停止监听陀螺仪数据
     * @en Stop listening to gyroscope data
     */
    stop(): void
    /**
     * @zh 获取当前陀螺仪数据
     * @en Get current gyroscope data
     */
    getCurrent(): Gyroscope.getCurrent.Result
    /**
     * @zh 注册陀螺仪数据变化事件监听回调函数
     * @en Register the gyroscope data change event listener callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消陀螺仪数据变化事件监听回调函数
     * @en Cancel the gyroscope data change event listener callback function
     */
    offChange(callback: () => void): void
    /**
     * @zh 设置触发频率的模式，`mode` 值参考频率模式常量
     * @en Set the mode of trigger frequency, `mode` value reference frequency mode constant
     * @constants freq_mode
     * @version 3.0
     */
    setFreqMode(mode: number): void
    /**
     * @zh 获取触发频率模式，结果值参考频率模式常量
     * @en Get the mode of trigger frequency, result value reference frequency mode constant
     * @constants freq_mode
     * @version 3.0
     */
    getFreqMode(): number
  }
  namespace Accelerometer {
    namespace getCurrent {
      /**
       * @output
       */
      interface Result {
        /**
         * @zh x 轴的加速度，单位 cm/s^2
         * @en Acceleration of x-axis in cm/s^2
         */
        x: number
        /**
         * @zh y 轴的加速度，单位 cm/s^2
         * @en Acceleration of y-axis in cm/s^2
         */
        y: number
        /**
         * @zh z 轴的加速度，单位 cm/s^2
         * @en Acceleration of z-axis in cm/s^2
         */
        z: number
      }
    }
  }

  /**
   * @zh 加速度传感器
   * @en accelerometer
   * @permissionCode device:os.accelerometer
   * @version 3.0
   * @example
   * ```js
   * import { Accelerometer } from 'zeppos-cross-api/sensor'
   *
   * const accelerometer = new Accelerometer()
   *
   * const callback = () => {
   *   console.log(accelerometer.getCurrent())
   * }
   * accelerometer.onChange(callback)
   * accelerometer.start()
   *
   * // When not needed for use
   * accelerometer.offChange()
   * accelerometer.stop()
   * ```
   */
  class Accelerometer {
    /**
     * @zh 开始监听加速度传感器数据
     * @en Start listening to accelerometer data
     */
    start(): void
    /**
     * @zh 停止监听加速度传感器数据
     * @en Stop listening to accelerometer data
     */
    stop(): void
    /**
     * @zh 获取当前加速度传感器数据
     * @en Get current accelerometer data
     */
    getCurrent(): Accelerometer.getCurrent.Result
    /**
     * @zh 注册加速度传感器数据变化事件监听回调函数
     * @en Register the accelerometer data change event listener callback function
     */
    onChange(callback: () => void): void
    /**
     * @zh 取消加速度传感器数据变化事件监听回调函数
     * @en Cancel the accelerometer data change event listener callback function
     */
    offChange(callback: () => void): void
    /**
     * @zh 设置触发频率的模式，`mode` 值参考频率模式常量
     * @en Set the mode of trigger frequency, `mode` value reference frequency mode constant
     * @constants freq_mode
     * @version 3.0
     */
    setFreqMode(mode: number): void
    /**
     * @zh 获取触发频率模式，结果值参考频率模式常量
     * @en Get the mode of trigger frequency, result value reference frequency mode constant
     * @constants freq_mode
     * @version 3.0
     */
    getFreqMode(): number
  }
  /**
   * @zh 屏幕状态传感器
   * @en Screen Status Sensor
   * @version 3.0
   * @example
   * ```js
   * import { Screen } from 'zeppos-cross-api/sensor'
   *
   * const screen = new Screen()
   * const status = screen.getStatus()
   * const callback = () => {
   *   console.log(screen.getStatus())
   * }
   *
   * screen.onChange(callback)
   *
   * // When not needed for use
   * screen.offChange(callback)
   * ```
   */
  class Screen {
    /**
     * @zh 获取屏幕状态，`1`: 亮屏、`2`: 息屏
     * @en Get the screen status, `1`: On, `2`: Off
     */
    getStatus(): number
    /**
     * @zh 是否开启 AOD 息屏显示功能
     * @en Whether to turn on the AOD rest screen display function
     */
    getAodMode(): number
    /**
     * @zh 注册屏幕显示变化事件监听回调函数
     * @en Register a callback function to listen to screen display change events
     */
    onChange(callback: (status: number) => void): void
    /**
     * @zh 取消屏幕显示变化事件监听回调函数
     * @en Cancel a callback function to listen to screen display change events
     */
    offChange(callback: (status: number) => void): void
  }}

/**
  * @zh 系统设置
  * @en System Settings
  */
declare module 'zeppos-cross-api/settings' {

  /**
   * @zh 年-月-日
   * @en year-month-day
   */
  const DATE_FORMAT_YMD: number
  /**
   * @zh 日-月-年
   * @en day-month-year
   */
  const DATE_FORMAT_DMY: number
  /**
   * @zh 月-日-年
   * @en month-day-year
   */
  const DATE_FORMAT_MDY: number
  /**
   * @zh 12 小时制
   * @en 12-hour format
   * @version 2.1
   */
  const TIME_FORMAT_12: number
  /**
   * @zh 24 小时制
   * @en 24-hour format
   * @version 2.1
   */
  const TIME_FORMAT_24: number
  /**
   * @zh 公制
   * @en metric system
   */
  const DISTANCE_UNIT_METRIC: number
  /**
   * @zh 英制
   * @en imperial system
   */
  const DISTANCE_UNIT_IMPERIAL: number
  /**
   * @zh 千克
   * @en Kilogram
   */
  const WEIGHT_UNIT_KILOGRAM: number
  /**
   * @zh 斤
   * @en Jin
   */
  const WEIGHT_UNIT_JIN: number
  /**
   * @zh 英磅
   * @en Pound
   */
  const WEIGHT_UNIT_POUND: number
  /**
   * @zh 英石
   * @en Stone
   */
  const WEIGHT_UNIT_STONE: number
  /**
   * @zh 摄氏温度
   * @en Celsius temperature
   */
  const TEMPERATURE_UNIT_CENTIGRADE: number
  /**
   * @zh 华氏温度
   * @en Fahrenheit temperature
   */
  const TEMPERATURE_UNIT_FAHRENHEIT: number
  namespace getLanguage {
    /**
     * @zh 此处不一一列举，请参考多语言映射
     * @en Please see the Multilingual Mapping for more details
     */
    type Result = number
  }

  /**
   * @zh 获取当前系统语言设置
   * @en Get the current system language setting
   * @example
   * ```js
   * import { getLanguage } from 'zeppos-cross-api/settings'
   *
   * const languageCode = getLanguage()
   * console.log(languageCode)
   * ```
   */
  function getLanguage(): getLanguage.Result
  namespace getDateFormat {
    /**
     * @zh 日期格式，值参考日期格式常量
     * @en Date format, value refer to date format constants
     */
    type Result = number
  }

  /**
   * @zh 获取当前系统日期格式
   * @en Get the current system date format
   * @constants dateFormat
   * @example
   * ```js
   * import { getDateFormat, DATE_FORMAT_YMD } from 'zeppos-cross-api/settings'
   *
   * const currentDateFormat = getDateFormat()
   *
   * if (currentDateFormat === DATE_FORMAT_YMD) {
   *   console.log('date format is YYYY-MM-DD')
   * }
   * ```
   */
  function getDateFormat(): getDateFormat.Result
  namespace getTimeFormat {
    /**
     * @zh 小时格式，值参考小时格式常量
     * @en Hour format, value refer to hour format constants
     */
    type Result = number
  }

  /**
   * @zh 获取当前系统时间格式，12 小时/24 小时
   * @en Get the current system time format, 12-hour format or 24-hour format
   * @constants hourFormat
   * @version 2.1
   * @example
   * ```js
   * import { getTimeFormat, TIME_FORMAT_24 } from 'zeppos-cross-api/settings'
   *
   * const timeFormat = getTimeFormat()
   *
   * if (timeFormat === TIME_FORMAT_24) {
   *   console.log('time format is 24-hour format')
   * }
   * ```
   */
  function getTimeFormat(): getTimeFormat.Result
  namespace getDistanceUnit {
    /**
     * @zh 距离单位，值参考距离单位常量
     * @en Distance units, value refer to distance unit constants
     */
    type Result = number
  }

  /**
   * @zh 返回当前的距离单位是公制还是英制。该方法是获取的是用户设置的单位，不代表数据的单位，数据单位参考相应数据的接口说明
   * @en Returns whether the current distance unit is metric or imperial. This method is to get the units set by the user, not to represent the units of the data, the data units refer to the interface description of the corresponding data
   * @constants distanceUnit
   * @example
   * ```js
   * import { getDistanceUnit, DISTANCE_UNIT_METRIC } from 'zeppos-cross-api/settings'
   *
   * const distanceUnit = getDistanceUnit()
   *
   * if (distanceUnit === DISTANCE_UNIT_METRIC) {
   *   console.log('metric')
   * }
   * ```
   */
  function getDistanceUnit(): getDistanceUnit.Result
  namespace getWeightUnit {
    /**
     * @zh 重量单位，值参考重量单位常量
     * @en Weight units, value refer to weight unit constants
     */
    type Result = number
  }

  /**
   * @zh 获取用户设置的重量单位
   * @en Gets the weight unit set by the user
   * @constants weightUnit
   * @example
   * ```js
   * import { getWeightUnit, WEIGHT_UNIT_KILOGRAM } from 'zeppos-cross-api/settings'
   *
   * const weightUnit = getWeightUnit()
   *
   * if (weightUnit === WEIGHT_UNIT_KILOGRAM) {
   *   console.log('Kilogram')
   * }
   * ```
   */
  function getWeightUnit(): getWeightUnit.Result
  namespace getWeightTarget {
    /**
     * @zh 用户设置的体重目标，默认为 `0`
     * @en User-set weight target, default is `0`
     */
    type Result = number
  }

  /**
   * @zh 获取用户设置的体重目标
   * @en Get the weight target set by the user
   * @example
   * ```js
   * import { getWeightTarget } from 'zeppos-cross-api/settings'
   *
   * const weightTarget = getWeightTarget()
   * console.log(weightTarget)
   * ```
   */
  function getWeightTarget(): getWeightTarget.Result
  namespace getSleepTarget {
    /**
     * @zh 用户设置的睡眠目标，默认为 `0`，单位分钟
     * @en User-set sleep target, default is `0`, in minutes
     */
    type Result = number
  }

  /**
   * @zh 获取用户设置的睡眠目标
   * @en Get the sleep target set by the user
   * @example
   * ```js
   * import { getSleepTarget } from 'zeppos-cross-api/settings'
   *
   * const sleepTarget = getSleepTarget()
   * console.log(sleepTarget)
   * ```
   */
  function getSleepTarget(): getSleepTarget.Result
  namespace getTemperatureUnit {
    /**
     * @zh 温度单位，值参考温度单位常量
     * @en Temperature units, value reference temperature unit constants
     */
    type Result = number
  }

  /**
   * @zh 获取用户设置的温度单位
   * @en Get the temperature units set by the user
   * @constants temperatureUnit
   * @version 2.1
   * @example
   * ```js
   * import { getTemperatureUnit, TEMPERATURE_UNIT_CENTIGRADE } from 'zeppos-cross-api/settings'
   *
   * const temperatureUnit = getTemperatureUnit()
   *
   * if (temperatureUnit === TEMPERATURE_UNIT_CENTIGRADE) {
   *   console.log('centigrade')
   * }
   * ```
   */
  function getTemperatureUnit(): getTemperatureUnit.Result
  namespace getSystemInfo {
    /**
     * @output
     */
    interface Result {
      /**
       * @zh Zepp OS 系统版本
       * @en Zepp OS System Version
       */
      osVersion: string
      /**
       * @zh 设备固件版本
       * @en Device firmware version
       */
      firmwareVersion: string
      /**
       * @zh API_LEVEL 版本
       * @en API_LEVEL
       */
      minAPI: string
    }
  }

  /**
   * @zh 获取系统相关信息
   * @en Get system related information
   * @version 2.1
   * @example
   * ```js
   * import { getSystemInfo } from 'zeppos-cross-api/settings'
   *
   * const { minAPI } = getSystemInfo()
   * console.log(minAPI)
   * ```
   */
  function getSystemInfo(): getSystemInfo.Result
  namespace getSystemMode {
    /**
     * @output
     */
    interface Result {
      /**
       * @zh 勿扰模式开关状态
       * @en State of Do Not Disturb Mode
       */
      DND: boolean
      /**
       * @zh 睡眠模式开关状态
       * @en State of Sleep Mode
       */
      sleep: boolean
      /**
       * @zh 剧场模式开关状态
       * @en State of Sleep Mode
       */
      theater: boolean
      /**
       * @zh 屏幕锁定开关状态
       * @en State of Screen Lock Mode
       */
      systemLock: boolean
      /**
       * @zh 低温模式开关状态
       * @en State of Low Temperature Mode
       */
      lowTemperature: boolean
      /**
       * @zh 省电模式开关状态
       * @en State of Power Saving Mode
       */
      powerSaving: boolean
      /**
       * @zh 省电时钟模式开关状态
       * @en State of Clock Mode
       */
      ultraPowerSaving: boolean
      /**
       * @zh 按键模式开关状态
       * @en State of Button Mode
       */
      button: boolean
      /**
       * @zh 无障碍模式开关状态
       * @en State of Accessible
       */
      accessibleSwitch: boolean
    }
  }

  /**
   * @zh 获取系统各种模式的设置信息
   * @en Get the system mode setting information
   * @version 3.0
   * @example
   * ```js
   * import { getSystemMode } from 'zeppos-cross-api/settings'
   *
   * const mode = getSystemMode()
   * console.log(mode)
   * ```
   */
  function getSystemMode(): getSystemMode.Result}

/**
  * @zh 存储
  * @en Storage
  */
declare module 'zeppos-cross-api/storage' {

  /**
   * @zh 本地存储的键值对，数据在小程序卸载过后清除
   * @en Locally stored key-value pairs, data cleared after Mini Program uninstallation
   * @permissionCode device:os.local_storage
   * @example
   * ```js
   * import { localStorage } from 'zeppos-cross-api/storage'
   *
   * localStorage.setItem('test', 'test value')
   * const val = localStorage.getItem('test')
   * const defaultValue = localStorage.getItem('none_key', 'defaultValue')
   *
   * localStorage.removeItem('test')
   * localStorage.clear()
   * ```
   */
  interface localStorage {
    /**
     * @zh 保存数据
     * @en Get sleep information
     */
    setItem(key: string, value: any): void
    /**
     * @zh 读取数据，指定默认值 `defaultValue` 后，如果没有获取到指定 `key` 上的值，返回 `defaultValue`
     * @en Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.
     */
    getItem(key: string, defaultValue?: any): void
    /**
     * @zh 删除所指定 `key` 的数据
     * @en Delete the data of the specified `key`
     */
    removeItem(key: string): void
    /**
     * @zh 清空 localStorage 中所有数据
     * @en Clear all data in localStorage
     */
    clear(): void
  }

  const localStorage: localStorage
  /**
   * @zh 本地存储的键值对，数据在小程序卸载过后清除
   * @en Locally stored key-value pairs, data cleared after Mini Program uninstallation
   * @permissionCode device:os.local_storage
   * @version 3.0
   * @example
   * ```js
   * import { LocalStorage } from 'zeppos-cross-api/storage'
   *
   * const localStorage = new LocalStorage()
   * localStorage.setItem('test', 'test value')
   * const val = localStorage.getItem('test')
   * const defaultValue = localStorage.getItem('none_key', 'defaultValue')
   *
   * localStorage.removeItem('test')
   * localStorage.clear()
   * ```
   */
  class LocalStorage {
    /**
     * @zh 保存数据
     * @en Get sleep information
     */
    setItem(key: string, value: any): void
    /**
     * @zh 读取数据，指定默认值 `defaultValue` 后，如果没有获取到指定 `key` 上的值，返回 `defaultValue`
     * @en Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.
     */
    getItem(key: string, defaultValue?: any): void
    /**
     * @zh 删除所指定 `key` 的数据
     * @en Delete the data of the specified `key`
     */
    removeItem(key: string): void
    /**
     * @zh 清空 localStorage 中所有数据
     * @en Clear all data in localStorage
     */
    clear(): void
  }
  /**
   * @zh 键值对存储，数据在退出小程序后清除
   * @en Key-value pairs are stored and data is cleared after exiting the Mini Program
   * @example
   * ```js
   * import { sessionStorage } from 'zeppos-cross-api/storage'
   *
   * sessionStorage.setItem('test', 'test value')
   * const val = sessionStorage.getItem('test')
   * const defaultValue = sessionStorage.getItem('none_key', 'defaultValue')
   *
   * sessionStorage.removeItem('test')
   * sessionStorage.clear()
   * ```
   */
  interface sessionStorage {
    /**
     * @zh 保存数据
     * @en Get sleep information
     */
    setItem(key: string, value: any): void
    /**
     * @zh 读取数据，指定默认值 `defaultValue` 后，如果没有获取到指定 `key` 上的值，返回 `defaultValue`
     * @en Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.
     */
    getItem(key: string, defaultValue?: any): void
    /**
     * @zh 删除所指定 `key` 的数据
     * @en Delete the data of the specified `key`
     */
    removeItem(key: string): void
    /**
     * @zh 清空 sessionStorage 中所有数据
     * @en Clear all data in sessionStorage
     */
    clear(): void
  }

  const sessionStorage: sessionStorage
  /**
   * @zh 键值对存储，数据在退出小程序后清除
   * @en Key-value pairs are stored and data is cleared after exiting the Mini Program
   * @example
   * ```js
   * import { SessionStorage } from 'zeppos-cross-api/storage'
   *
   * const sessionStorage = new SessionStorage()
   * sessionStorage.setItem('test', 'test value')
   * const val = sessionStorage.getItem('test')
   * const defaultValue = sessionStorage.getItem('none_key', 'defaultValue')
   *
   * sessionStorage.removeItem('test')
   * sessionStorage.clear()
   * ```
   */
  class SessionStorage {
    /**
     * @zh 保存数据
     * @en Get sleep information
     */
    setItem(key: string, value: any): void
    /**
     * @zh 读取数据，指定默认值 `defaultValue` 后，如果没有获取到指定 `key` 上的值，返回 `defaultValue`
     * @en Read the data, specify the default value `defaultValue`, and return `defaultValue` if the value on the specified `key` is not retrieved.
     */
    getItem(key: string, defaultValue?: any): void
    /**
     * @zh 删除所指定 `key` 的数据
     * @en Delete the data of the specified `key`
     */
    removeItem(key: string): void
    /**
     * @zh 清空 sessionStorage 中所有数据
     * @en Clear all data in sessionStorage
     */
    clear(): void
  }}

/**
  * @zh 文件传输
  * @en Transfer File
  */
declare module 'zeppos-cross-api/transfer-file' {
}

/**
  * @zh 用户
  * @en User
  */
declare module 'zeppos-cross-api/user' {

  /**
   * @zh 男性
   * @en Male
   */
  const GENDER_MALE: number
  /**
   * @zh 女性
   * @en Female
   */
  const GENDER_FEMALE: number
  /**
   * @zh 用户未指定
   * @en User not specified
   */
  const GENDER_UNSPECIFIED: number
  namespace getProfile {
    /**
     * @output
     */
    interface Result {
      /**
       * @zh 用户年龄，无数据时为 `0`
       * @en User age, `0` if no data
       */
      age: number
      /**
       * @zh 用户身高，无数据时为 `0`
       * @en User height, `0` if no data
       */
      height: number
      /**
       * @zh 用户体重，无数据时为 `0`
       * @en User weight, `0` if no data
       */
      weight: number
      /**
       * @zh 用户性别，值参考用户性别常量
       * @en User gender, value refer to user gender constants
       */
      gender: number
      /**
       * @zh 用户昵称
       * @en User's nickname
       */
      nickName: string
      /**
       * @zh 用户账号注册国家/地区 ISO 代码
       * @en ISO code of the country or region where the user account is registered
       */
      region: string
    }
  }

  /**
   * @zh 获取用户信息
   * @en Get user information
   * @constants gender
   * @permissionCode data:user.info
   * @example
   * ```js
   * import { getProfile, GENDER_MALE } from 'zeppos-cross-api/user'
   *
   * const { age, gender } = getProfile()
   * console.log(age)
   *
   * if (gender === GENDER_MALE) {
   *   console.log('male')
   * }
   * ```
   */
  function getProfile(): getProfile.Result
  namespace addHealthData {
    interface Option {
      /**
       * @zh 体重，单位 g
       * @en Weight, in g
       */
      weight: number
      /**
       * @zh BMI 数值的 100 倍
       * @en 100 times the value of BMI
       */
      bmi: number
    }

    type Result = boolean
  }

  /**
   * @zh 设置用户健康数据信息
   * @en Set user health data information
   * @permissionCode data:user.health
   * @version 3.0
   * @example
   * ```js
   * import { addHealthData } from 'zeppos-cross-api/user'
   *
   * addHealthData({
   *   weight: 65,
   *   bmi: 1900
   * })
   * ```
   */
  function addHealthData(option: addHealthData.Option): addHealthData.Result}

/**
  * @zh 工具
  * @en Utils
  */
declare module 'zeppos-cross-api/utils' {

  namespace px {
    /**
     * @zh 以 `designWidth` 为缩放基准的像素值
     * @en Pixel values based on `designWidth`
     */
    type PxValue = number

    /**
     * @zh 根据机型实际宽度进行缩放计算后的像素值
     * @en Pixel values after scaling calculation
     */
    type Result = number
  }

  /**
   * @zh 以小程序配置 `app.json` 中 `targets` 对象中各机型配置的 `designWidth` 为基准进行像素值缩放计算
   * @en Pixel scaling calculation. The `designWidth` of each model in the `targets` object in the `app.json` is used as the base.
   * @example
   * ```js
   * import { px } from 'zeppos-cross-api/utils'
   *
   * px(480)
   * ```
   */
  function px(value: px.PxValue): px.Result
  namespace assets {
    /**
     * @zh 基础路径，会拼接在资源文件路径之前
     * @en The base path, which will be spliced before the resource file path
     */
    type BasePath = string

    /**
     * @zh 资源文件路径构造函数
     * @en Resource file path constructor
     */
    type AssetsPathFunc = (path: Path, isRtl?: IsRtl) => ResultPath

    /**
     * @zh 资源文件路径
     * @en Resource file path
     */
    type Path = string

    /**
     * @zh 是否需要拼接 rtl 路径
     * @en Whether to splice the rtl path
     */
    type IsRtl = boolean

    /**
     * @zh 最终文件路径
     * @en Final file path
     */
    type ResultPath = string
  }

  /**
   * @zh 用于处理资源文件路径，拼接 `basePath`。并可传入参数对图片进行 rtl 路径转换，用于小程序的 RTL 适配
   * @en Used to handle resource file paths, splice `basePath`. and can pass in parameters for rtl path conversion of images, for RTL adaptation of Mini Program
   * @example
   * ```js
   * import { assets } from 'zeppos-cross-api/utils'
   *
   * const imagePath = 'zeppos-logo.png'
   * const assetsPathFunc = assets('img')
   *
   * console.log(assetsPathFunc(imagePath)) // img/zeppos-logo.png
   * console.log(assetsPathFunc(imagePath, true)) // img/zeppos-logo@rtl.png
   * ```
   */
  function assets(basePath: assets.BasePath): assets.AssetsPathFunc
  /**
   * @zh `log` 实例用于日志打印，有多种等级的日志方法，方便在控制台进行过滤
   * @en The `log` instance is used for log printing and has multiple levels of logging methods for easy filtering in the console
   * @example
   * ```js
   * import { log } from 'zeppos-cross-api/utils'
   *
   * const pageLogger = log.getLogger('page')
   *
   * pageLogger.log('page created')
   * pageLogger.error('page error')
   * ```
   */
  interface log {
    /**
     * @zh 返回一个新的 `log` 实例，带有 `name` 标记，在执行打印日志方法时，会加入 `name` 标记，便于区分
     * @en Returns a new `log` instance with the `name` tag, which is added when the print log method is executed to make it easier to distinguish
     */
    getLogger(name: string): log
    /**
     * @zh 打印 log 级别的日志
     * @en Print log level logs
     */
    log(...args: string[]): void
    /**
     * @zh 打印 warn 级别的日志
     * @en Print warn level logs
     */
    warn(...args: string[]): void
    /**
     * @zh 打印 debug 级别的日志
     * @en Print debug level logs
     */
    debug(...args: string[]): void
    /**
     * @zh 打印 error 级别的日志
     * @en Print error level logs
     */
    error(...args: string[]): void
    /**
     * @zh 打印 info 级别的日志
     * @en Print info level logs
     */
    info(...args: string[]): void
  }

  const log: log
  /**
   * @zh EventBus 是一个提供事件发布/订阅的工具类
   * @en EventBus is a tool class that provides event publishing/subscription
   * @example
   * ```js
   * import { EventBus } from 'zeppos-cross-api/utils'
   *
   * const eventBus = new EventBus()
   *
   * eventBus.on('data', (data) => {
   *  console.log(data)
   * })
   *
   * eventBus.emit('data', 'Hello Zepp OS!')
   * ```
   */
  class EventBus {
    /**
     * @zh 为 `eventName` 对应的的监听器数组中添加一个事件监听器
     * @en Adds the listener function to the end of the listeners array for the event named eventName
     */
    on(eventName: string, listener: (...args: any[]) => void): void
    /**
     * @zh 移除 `eventName` 对应的的监听器数组中的一个事件监听器
     * @en Removes the specified listener from the listener array for the event named eventName
     */
    off(eventName: string, listener: (...args: any[]) => void): void
    /**
     * @zh 触发 `eventName` 对应的的监听器数组中的所有事件监听器
     * @en Triggers the listener functions for the event named eventName
     */
    emit(eventName: string, ...args: any[]): void
    /**
     * @zh 为 `eventName` 添加一个仅生效一次的事件监听器
     * @en Adds a one-time listener function for the event named eventName
     */
    once(eventName: string, listener: (...args: any[]) => void): void
    /**
     * @zh 移除所有事件监听器
     * @en Removes all listeners, or those of the specified eventName
     */
    clear(): void
    /**
     * @zh 获取对应 `eventName` 对应的注册事件监听器的数量。不传递 `eventName` 则获取所注册 `eventName` 种类的数量
     * @en Gets the number of registered event listeners corresponding to `eventName`. If `eventName` is not passed, get the number of registered `eventName` types
     */
    count(eventName?: string): number
  }}

/**
 * @zh UI 视图
 * @en UI
 */
declare module 'zeppos-cross-api/ui' {
  namespace HmWearableProgram {
    namespace DeviceSide {
        namespace HmUI {
            interface IHmUIPropertyType {
                MORE: number;
                /**
                 * @zh x 坐标
                 * @en x coordinate
                 */
                X: number;
                /**
                 * @zh y 坐标
                 * @en y coordinate
                 */
                Y: number;
                /**
                 * @zh 宽度
                 * @en Width
                 */
                W: number;
                /**
                 * @zh 高度
                 * @en Height
                 */
                H: number;
                POS_X: number;
                POS_Y: number;
                ANGLE: number;
                CENTER_X: number;
                CENTER_Y: number;
                /**
                 * @zh 资源路径
                 * @en Resource Path
                 */
                SRC: number;
                /**
                 * @zh 文字内容
                 * @en Text Content
                 */
                TEXT: number;
                /**
                 * @zh 文字大小
                 * @en Text size
                 */
                TEXT_SIZE: number;
                COLOR: number;
                START_ANGLE: number;
                END_ANGLE: number;
                LINE_WIDTH: number;
                LINE_PROGRESS_START_X: number;
                LINE_PROGRESS_START_Y: number;
                LINE_PROGRESS_END_X: number;
                LINE_PROGRESS_END_Y: number;
                LINE_PROGRESS_PROGRESS: number;
                LINE_PROGRESS_SRC_BG: number;
                LINE_PROGRESS_SRC_PROGRESS: number;
                LINE_PROGRESS_SRC_INDICATOR: number;
                WORD_WRAP: number;
                ID: number;
                DATASET: number;
                VISIBLE: number;
            }

            interface IHmUIWidgetType {
                /**
                 * @zh GROUP 组控件用于将一系列控件分组，便于统一控制显示/隐藏，注册事件等
                 * @en GROUP group component is used to group a series of components together for unified widget of show/hide, registering events, etc
                 */
                GROUP: number;
                /**
                 * @zh 图片控件用于展示图片，支持图片旋转
                 * @en The image widget is used to display images and supports image rotation
                 */
                IMG: number;
                /**
                 * @zh 文本控件用于展示文本。支持设置文本大小、颜色、对齐方式
                 * @en Text component for displaying text. Support setting text size, color and alignment
                 */
                TEXT: number;
                /**
                 * @zh 圆弧控件展示圆弧进度。支持设置线宽、颜色、开始和结束的角度
                 * @en Arc widget to display arc progress. Support setting line width, color, start and end angle
                 */
                ARC: number;
                /**
                 * @zh 填充矩形控件用于绘制一个纯色矩形区域
                 * @en The Fill Rectangle widget is used to draw a solid color rectangular area
                 */
                FILL_RECT: number;
                /**
                 * @zh 描边矩形控件在填充矩形控件的基础上加入了描边
                 * @en The stroked rectangle widget adds a stroke on the basis of the filled rectangle component
                 */
                STROKE_RECT: number;
                TEXT_IMG: number;
                ARC_PROGRESS: number;
                IMG_PROGRESS: number;
                IMG_LEVEL: number;
                /**
                 * @zh 按照设置的帧率播放预先给定的图片，形成动画效果
                 * @en Play the pre-given image at the set frame rate to create an animation effect
                 */
                IMG_ANIM: number;
                /**
                 * @zh 按钮控件支持设置正常态和按压态的颜色或者图片
                 * @en The button widget supports setting images and colors for normal and pressed states
                 */
                BUTTON: number;
                /**
                 * @zh 绘制一个圆形，支持颜色、透明度等属性
                 * @en Draws a circle with support for color, transparency, and other properties
                 */
                CIRCLE: number;
                /**
                 * @zh 对话弹窗由一段文本和两个按钮构成，点击按钮后弹框会消失
                 * @en Dialog popup consists of a piece of text and two buttons. The popup box disappears when the buttons are clicked
                 */
                DIALOG: number;
                /**
                 * @zh 创建一块支持滑动的列表区域，每个列表的 item 中可以设置图片和文字
                 * @en Create a sliding list area, which can be filled with pictures and text
                 */
                SCROLL_LIST: number;
                /**
                 * @zh 用于在打开和关闭状态之间进行切换
                 * @en Used to switch between open and closed states
                 */
                SLIDE_SWITCH: number;
                /**
                 * @zh 创建一个可以循环滚动的列表，每个 item 可以设置为一张图片
                 * @en Create a list that scrolls in a loop, which can be populated with images
                 */
                CYCLE_LIST: number;
                /**
                 * @zh 创建一个可以循环滚动的列表，其中可以填充图片和文字
                 * @en Create a list that can be scrolled in a loop, filled with images and text
                 */
                CYCLE_IMAGE_TEXT_LIST: number;
                IMG_POINTER: number;
                /**
                 * @zh 用于在多个选项中选择多个选项。每个选项需要使用 STATE_BUTTON 来创建
                 * @en Used to select a single result among multiple options. Each individual option needs to be created using STATE_BUTTON
                 */
                CHECKBOX_GROUP: number;
                STATE_BUTTON: number;
                /**
                 * @zh 用于在多个选项中选择单个选项。每个单独的选项是 STATE_BUTTON 控件，需要单独创建
                 * @en Used to select a single result among multiple options. Each individual option needs to be created using STATE_BUTTON
                 */
                RADIO_GROUP: number;
                WIDGET_DELEGATE: number;
                /**
                 * @zh 绘制直方图
                 * @en Draws a histogram
                 */
                HISTOGRAM: number;
                /**
                 * @zh 展示时间选择控件，提供用户选择
                 * @en Time picker widget, providing user choice
                 */
                PICK_DATE: number;
            }

            type HmUIAttributeType = number;
            type HmUIStyleType = number;
            type HmUIPropertyType = number;
            type HmUIPropertyValue = string | number | boolean | object | undefined;

            interface IHmUIWidget {
                getId(): number;
                /**
                 * @zh 获取 UI 控件类型
                 * @en Get the UI widget type
                 */
                getType(): number;
                /**
                 * @zh 设置 UI 控件属性
                 * @en Set the properties of the UI widget
                 */
                setProperty(prop: HmUIPropertyType, val: HmUIPropertyValue): boolean;
                /**
                 * @zh 获取 UI 控件属性，可以尝试使用 widget.getProperty(hmUI.prop.MORE, {}) 获取 UI 控件的全部属性
                 * @en Get the UI widget properties, use widget.getProperty(hmUI.prop.MORE, {}) to get all the properties of the widget
                 */
                getProperty<T>(prop: HmUIPropertyType): T | undefined;
                /**
                 * @zh 给 UI 控件注册事件监听器，当触发指定事件时，给定的回调函数就会被执行
                 * @en Register a listener to the UI widget and the given callback function will be executed when the specified event is triggered
                 */
                addEventListener(eventType: HmUIEventType, listener: IHmUIEventListener): boolean;
                /**
                 * @zh 删除 UI 控件使用 widget.addEventListener 方法注册的事件监听器
                 * @en Remove event listeners registered by the UI widget using the widget.addEventListener method
                 */
                removeEventListener(eventType?: HmUIEventType, listener?: IHmUIEventListener): boolean;
                triggerEvent(eventType: HmUIEventType): boolean;
                getVisibility(): boolean;
                setVisibility(show: boolean): boolean;
                destroy(): boolean;
                /* For Group and view Container */
                createWidget(widgetType: HmUIWidgetType, options: HmUIWidgetOptions): IHmUIWidget;
            }

            type HmUIWidgetOptions = Record<
                        string,
                        number | string | boolean | IHmUIEventListener | undefined | null | Record<string, any>
                      >;
            type HmUIWidgetType = number;

            interface IHmUIGetTextLayoutOptions {
                text_size: number;
                text_width?: number;
                font_name?: string;
                wrapped?: number;
            }

            interface IHmUIGetTextLayout {
                (text: string, options: IHmUIGetTextLayoutOptions): { width: number; height: number };
            }

            interface IHmUIFunction {
                /**
                 * @zh 创建 UI 控件
                 * @en Create UI widgets
                 */
                createWidget(widgetType: HmUIWidgetType, options: HmUIWidgetOptions): IHmUIWidget;
                /**
                 * @zh 删除 UI 控件
                 * @en Delete the UI widget
                 */
                deleteWidget(widget: IHmUIWidget): boolean;
                /**
                 * @zh 重新绘制页面，防止部分情况下 UI 没有刷新
                 * @en Redraw the page to prevent the UI from not refreshing in some cases
                 */
                redraw(): void;
            }

            interface IHmUIDialogType {
                show(isShow: boolean): void;
            }

            interface IHmUIExtensionFunction {
                /**
                 * @zh 计算出目标文本布局完成之后的高度和宽度，并不会实际进行渲染，只进行布局计算
                 * @en Calculate the height and width of the target text after the layout is completed, and does not actually render it, only performs the layout calculation
                 */
                getTextLayout: IHmUIGetTextLayout;
                getRtlLayout(): boolean;
                relayoutRtl(): void;
                /**
                 * @zh 显示 Toast，支持 \n 文本换行
                 * @en Show Toast with \n text line feed support
                 */
                showToast(options: { text: string }): void;
                /**
                 * @zh 创建 Dialog 对话框
                 * @en Create a Dialog
                 */
                createDialog(options: {
                      title: string
                      show: boolean
                      auto_hide?: boolean
                      click_linster: (key: number) => void
                    }): IHmUIDialogType;
                /**
                 * @zh 将整个页面设置为 Swipe 轮播模式，可支持纵向、横向滚动
                 * @en Set the entire page to Swipe mode, which can support vertical and horizontal scrolling
                 */
                setScrollView(enable: boolean, pageHeight?: number, pageCount?: number, isVertical?: boolean): boolean;
                /**
                 * @zh 设置当前页面是否可以滑动
                 * @en Set whether the current page can be slid
                 */
                setLayerScrolling(enable: boolean): boolean;
                /**
                 * @zh 在使用 hmUI.setScrollView 将页面设置为 Swipe 轮播模式后，使用 hmUI.scrollToPage 可以跳转到对应的页面，并且可以设置跳转的动画效果
                 * @en After setting the page to Swipe mode with hmUI.setScrollView, you can use hmUI.scrollToPage to jump to the corresponding location and set the animation effect of the jump
                 */
                scrollToPage(index: number, animation: boolean): void;
                /**
                 * @zh 在使用 hmUI.setScrollView 将页面设置为 Swipe 轮播模式后，使用 hmUI.getScrollCurrentPage 可以获取当前轮播的页数
                 * @en After setting the page to Swipe mode with hmUI.setScrollView, use hmUI.getScrollCurrentPage to get the number of pages currently located
                 */
                getScrollCurrentPage(): undefined | number;
                /**
                 * @zh 该接口只在方屏设备上有效，设置状态栏是否可见
                 * @en This interface is only available on square screen devices, set the status bar visible or not
                 */
                setStatusBarVisible(visible: boolean): void;
                /**
                 * @zh 该接口只在方屏设备上有效，设置状态栏显示文本内容
                 * @en This interface is only available on square screen devices, set the status bar to display text content
                 */
                updateStatusBarTitle(title: string): void;
            }

            interface IHmUIAlign {
                /**
                 * @zh 竖轴-最上端
                 * @en Vertical axis-top
                 */
                TOP: number;
                /**
                 * @zh 竖轴-最底端
                 * @en Vertical axis-bottommost
                 */
                BOTTOM: number;
                /**
                 * @zh 横轴-左对齐
                 * @en Horizontal axis-left aligned
                 */
                LEFT: number;
                /**
                 * @zh 横轴-右对齐
                 * @en Horizontal axis-align right
                 */
                RIGHT: number;
                /**
                 * @zh 横轴-居中
                 * @en Horizontal axis-centered
                 */
                CENTER_H: number;
                /**
                 * @zh 竖轴-居中
                 * @en Vertical axis-centered
                 */
                CENTER_V: number;
            }

            interface IHmAnimStatus {
                START: Number;
                STOP: Number;
                PAUSE: Number;
                RESUME: Number;
                UNKNOW: Number;
            }

            interface IHmUIWrapTextStyle {
                WRAP: number;
                CHAR_WRAP: number;
                /**
                 * @zh 单行溢出字符显示...
                 * @en Single line overflow character display...
                 */
                ELLIPSIS: number;
                /**
                 * @zh 跑马灯
                 * @en Keep scrolling
                 */
                NONE: number;
            }

            interface IHmUIEventType {
                /**
                 * @zh 抬起
                 * @en Lift up
                 */
                CLICK_UP: number;
                /**
                 * @zh 按下
                 * @en Press
                 */
                CLICK_DOWN: number;
                /**
                 * @zh 划入
                 * @en Move in
                 */
                MOVE_IN: number;
                /**
                 * @zh 划出
                 * @en Move out
                 */
                MOVE_OUT: number;
                /**
                 * @zh 滑动
                 * @en Slide
                 */
                MOVE: number;
                /**
                 * @zh 一次完整点击（包含按下和抬起）
                 * @en One full click (including press and lift)
                 */
                SELECT: number;
            }

            interface IHmUIEvent {
                x: number;
                y: number;
                type: HmUIEventType;
                target: IHmUIWidget;
            }

            interface IHmUIEventListener {
                (event: IHmUIEvent): void;
            }

            type HmUIEventType = number;

            interface IHmUI extends IHmUIExtensionFunction, IHmUIFunction {
                /**
                 * @zh 控件类型
                 * @en Widget Type
                 */
                widget: IHmUIWidgetType;
                /**
                 * @zh 控件属性
                 * @en Widget Property
                 */
                prop: IHmUIPropertyType;
                /**
                 * @zh 控件事件
                 * @en Widget Event
                 */
                event: IHmUIEventType;
                /**
                 * @zh 对齐方式
                 * @en Alignment
                 */
                align: IHmUIAlign;
                /**
                 * @zh 文字换行处理方式
                 * @en Text line wrap handling
                 */
                text_style: IHmUIWrapTextStyle;
                /**
                 * @zh 动画状态设置
                 * @en Animation status setting
                 */
                anim_status: IHmAnimStatus;
            }
        }
    }
}

let hmUI: HmWearableProgram.DeviceSide.HmUI.IHmUI;

  export = hmUI
}

namespace NMessageBuilder {
  class MessageBuilder {
    constructor(options?: { appId: number, appDevicePort?: number, appSidePort?: number })

    /**
     * @zh 为 `eventName` 对应的的监听器数组中添加一个事件监听器
     * @en Adds the listener function to the end of the listeners array for the event named eventName
     */
    on(eventName: string, listener: (...args: any[]) => void): void
    /**
     * @zh 移除 `eventName` 对应的的监听器数组中的一个事件监听器
     * @en Removes the specified listener from the listener array for the event named eventName
     */
    off(eventName: string, listener: (...args: any[]) => void): void
    /**
     * @zh 触发 `eventName` 对应的的监听器数组中的所有事件监听器
     * @en Triggers the listener functions for the event named eventName
     */
    emit(eventName: string, ...args: any[]): void
    /**
     * @zh 获取对应 `eventName` 对应的注册事件监听器的数量。不传递 `eventName` 则获取所注册 `eventName` 种类的数量
     * @en Gets the number of registered event listeners corresponding to `eventName`. If `eventName` is not passed, get the number of registered `eventName` types
     */
    count(eventName?: string): number

    connect (cb: (MessageBuilder) => void): void
    disConnect (cb: (MessageBuilder) => void): void
    listen (cb: (MessageBuilder) => void): void
    request (data: object | Buffer | ArrayBuffer | ArrayBufferLike, opts: any): Promise<any>
    buf2Json (buf: ArrayBuffer): object
    json2Buf (json: object): ArrayBuffer
    response ({ requestId, contentType, dataType, data }): void
    call (data: object | Buffer): void

    // getMessageSize(): number
    // getMessagePayloadSize(): number
    // getMessageHeaderSize (): number
    // now (t?: number): number
    // buildBin (data: any): Buffer
    // buildShake (): Buffer
    // sendShake (): void
    // buildClose (): Buffer
    // sendClose (): void
    // readBin (arrayBuf: ArrayBuffer): { flag: number, version: number, type: number, port1: number, port2: number, appId: number, extra: number, payload: Uint8Array}
    // // opts 覆盖头部选项
    // buildData (payload, opts = {}): Buffer
    // sendBin (buf: Buffer, debug?: boolean): void
    // sendBinBySide (buf: Buffer, debug?: boolean): void
    // // 通用获取逻辑
    // getSafeSend (): void
    // // 大数据的复杂头部分包协议
    // sendHmProtocol ({ requestId, dataBin, type, contentType, dataType }, { messageType = MessageType.Data } = {}): void
    // // 大数据的简单分包协议
    // sendSimpleProtocol ({ dataBin }, { messageType = MessageType.Data } = {}): void
    // sendJson ({ requestId = 0, json, type = MessagePayloadType.Request, contentType, dataType }): void
    // sendBuf ({ requestId = 0, buf, type = MessagePayloadType.Request, contentType, dataType }): void
    // sendLog (str: string): void
    // sendDataWithSession ({ traceId, spanId, seqId, payload, type, opCode, totalLength, contentType, dataType }, { messageType }): void
    // sendSimpleData ({ payload }, { messageType }): void
    // buildPayload (data): Buffer
    // readPayload (arrayBuf: ArrayBuffer): {
    //   traceId: number,
    //   parentId: number,
    //   spanId: number,
    //   seqId: number,
    //   totalLength: number,
    //   payloadLength: number,
    //   payloadType: number,
    //   opCode: number,
    //   contentType: number,
    //   dataType: number,
    //   timestamp1: number,
    //   timestamp2: number,
    //   timestamp3: number,
    //   timestamp4: number,
    //   timestamp5: number,
    //   timestamp6: number,
    //   timestamp7: number,
    //   extra1: number,
    //   extra2: number,
    //   extra3: number,
    //   payload: Uint8Array
    // }
    // onFragmentData (bin): void
    // errorIfBleDisconnect (): void
    // onMessage (messagePayload): void
    // requestCb (data, opts, cb): Promise<void>
  }
}

declare module 'zeppos-cross-api/device-polyfill' {}

declare module 'zeppos-cross-api/data-conversion' {
  function len(binOrBuf: Buffer | ArrayBuffer): number

  function allocOfBin(size?: number): ArrayBuffer

  function allocOfBuf(size?: number): Buffer

  // ============= JSON =============

  function json2buf(json: any): Buffer
  
  function json2bin(json: any): ArrayBuffer

  function json2str(json: any): string

  // ============= Buffer =============

  function buf2json(buf: Buffer, encoding?: string): any

  function buf2bin(buf: Buffer): ArrayBuffer

  function buf2str(buf: Buffer, encoding?: string): string
  
  function buf2hex(buf: Buffer): string

  // ============= ArrayBuffer =============

  function bin2buf(bin: ArrayBuffer): Buffer

  function bin2str(bin: ArrayBuffer, encoding?: string): string

  function bin2hex(bin: ArrayBuffer): string

  function bin2json(bin: ArrayBuffer, encoding?: string): any

  // ============= string =============

  function str2json(str: string): any

  function str2buf(str: string, encoding?: string): Buffer
  
  function str2bin(str: string, encoding?: string): ArrayBuffer
}

declare module 'zeppos-cross-api/message' {
  class MessageBuilder extends NMessageBuilder.MessageBuilder {}
}

declare module 'zeppos-cross-api/message-side' {
  class MessageBuilder extends NMessageBuilder.MessageBuilder {}
}