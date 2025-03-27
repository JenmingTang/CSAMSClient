/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  // tang

  namespace CommonCSAMS {
    interface CommonParams {
      current: number;
      size: number;
      createTimeStart: number;
      createTimeEnd: number;
    }
    type SearchCommonParams = Pick<CommonParams, 'current' | 'size' | 'createTimeStart' | 'createTimeEnd'>;
  }
  namespace Sys {
    /** SysUser */
    // export interface SysUser {
    //   createTime?: Date;
    //   deleted?: number;
    //   enabled?: number;
    //   id?: number;
    //   password?: string;
    //   updateTime?: Date;
    //   username?: string;
    //   wechatOpenId?: string;
    //   [property: string]: any;
    // }
    // type SysUserSearchParams = CommonType.RecordNullable<
    //   Pick<SysUser, 'username' | 'wechatOpenId' | 'enabled'> & Api.CommonCSAMS.SearchCommonParams
    // >;

    // type SysUserList = Common.PaginatingQueryRecord<SysUser>;

    /** User */
    export type User = {
      avatarUrl?: string;
      college?: string;
      createTime?: Date;
      email?: string;
      id?: number;
      enabled?: number;
      major?: string;
      password?: string;
      phone?: string;
      realName?: string;
      updateTime?: Date;
      userClass?: string;
      username?: string;
      [property: string]: any;
    };
    type UserSearchParams = CommonType.RecordNullable<
      Pick<User, 'username' | 'enabled'> & Api.CommonCSAMS.SearchCommonParams
    >;

    type UserList = Common.PaginatingQueryRecord<User>;
    /** Role */
    export type Role = {
      createTime?: Date;
      description?: string;
      id?: number;
      roleName?: string;
      updateTime?: Date;
      [property: string]: any;
    };
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<User, 'roleName' | 'description'> & Api.CommonCSAMS.SearchCommonParams
    >;

    type RoleList = Common.PaginatingQueryRecord<Role>;
  }

  namespace Activity {
    /** Activity */
    export type Activity = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      clubId?: number;
      content?: string;
      createTime?: Date;
      endTime?: Date;
      id?: number;
      location?: string;
      startTime?: Date;
      title?: string;
      updateTime?: Date;
      [property: string]: any;
    };
    type ActivitySearchParams = CommonType.RecordNullable<
      // Pick<Activity, 'approvalStatus' | 'name' | 'approverName'> & Api.CommonCSAMS.SearchCommonParams
      Pick<Activity, ''> & Api.CommonCSAMS.SearchCommonParams
    >;
    /** Activity */
    export type ActivityVO = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      clubId?: number;
      content?: string;
      createTime?: Date;
      endTime?: Date;
      id?: number;
      location?: string;
      startTime?: Date;
      title?: string;
      updateTime?: Date;
      clubName?: string;
      approverName?: string;

      [property: string]: any;
    };
    type ActivityVOList = Common.PaginatingQueryRecord<ActivityVO>;
  }
  namespace ActivityMember {
    /** ActivityMember */
    export type ActivityMember = {
      activityId?: number;
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      id?: number;
      joinTime?: Date;
      updateTime?: Date;
      userId?: number;
      [property: string]: any;
    };
    type ActivityMemberSearchParams = CommonType.RecordNullable<
      Pick<ActivityMember, ''> & Api.CommonCSAMS.SearchCommonParams
    >;
    /** ActivityMember */
    export type ActivityMemberVO = {
      activityId?: number;
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      id?: number;
      joinTime?: Date;
      updateTime?: Date;
      userId?: number;
      userName?: string;
      activityName?: string;
      approverName?: string;
      [property: string]: any;
    };
    type ActivityMemberVOList = Common.PaginatingQueryRecord<ActivityMemberVO>;
  }
  namespace ActivityLocation {
    /** ActivityLocation */
    export type ActivityLocation = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      deleted?: number;
      description?: string;
      id?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
    };
    type ActivityLocationSearchParams = CommonType.RecordNullable<
      Pick<ActivityLocation, ''> & Api.CommonCSAMS.SearchCommonParams
    >; /** ActivityLocation */
    export type ActivityLocationVO = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      deleted?: number;
      description?: string;
      id?: number;
      name?: string;
      updateTime?: Date;
      approverName?: string;
      [property: string]: any;
    };
    type ActivityLocationVOList = Common.PaginatingQueryRecord<ActivityLocationVO>;
  }
  namespace LocalFile {
    /** LocalFile */
    export type LocalFile = {
      createTime?: Date;
      deleted?: Deleted;
      fileCategory?: FileCategory;
      fileName?: string;
      fileSize?: number;
      fileType?: string;
      fileUri?: string;
      id?: number;
      targetId?: number;
      targetType?: FileCategory;
      updateTime?: Date;
      [property: string]: any;
    };

    export enum Deleted {
      The0 = '0',
      The1 = '1'
    }

    export enum FileCategory {
      The0 = '0',
      The1 = '1',
      The2 = '2',
      The3 = '3'
    }
    type LocalFileSearchParams = CommonType.RecordNullable<Pick<LocalFile, ''> & Api.CommonCSAMS.SearchCommonParams>;
    type LocalFileList = Common.PaginatingQueryRecord<LocalFile>;
  }
  namespace Club {
    /** Club */
    export type Club = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      description?: string;
      founderId?: number;
      id?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
    };
    type ClubSearchParams = CommonType.RecordNullable<
      Pick<Club, 'approvalStatus' | 'name' | 'approverName'> & Api.CommonCSAMS.SearchCommonParams
    >; /** Club */
    export type ClubVO = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      createTime?: Date;
      description?: string;
      founderId?: number;
      id?: number;
      name?: string;
      founderName?: string;
      approverName?: string;
      updateTime?: Date;
      [property: string]: any;
    };
    type ClubVOList = Common.PaginatingQueryRecord<ClubVO>; /** ClubMember */
    export type ClubMember = {
      approvalStatus?: number;
      approveReason?: string;
      approverId?: number;
      approveTime?: Date;
      clubId?: number;
      createTime?: Date;
      id?: number;
      joinTime?: Date;
      updateTime?: Date;
      userId?: number;
      [property: string]: any;
    };
    type ClubMemberSearchParams = CommonType.RecordNullable<
      Pick<ClubMember, 'approvalStatus' | 'name' | 'approverName' | 'clubName'> & Api.CommonCSAMS.SearchCommonParams
    >; /** Club */
    export type ClubMemberVO = {
      approvalStatus?: number;
      approveReason?: string;
      userName?: string;
      clubName?: string;
      approverName?: string;
      approverId?: number;
      approveTime?: Date;
      clubId?: number;
      createTime?: Date;
      id?: number;
      joinTime?: Date;
      updateTime?: Date;
      userId?: number;
      [property: string]: any;
    };
    type ClubMemberVOList = Common.PaginatingQueryRecord<ClubMemberVO>;
  }
  namespace Info {
    /** InfoDepartment */
    export interface InfoDepartment {
      code?: string;
      createTime?: Date;
      deleted?: number;
      description?: string;
      id?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
    }
    type InfoDepartmentSearchParams = CommonType.RecordNullable<
      Pick<InfoDepartment, 'code' | 'name'> & Api.CommonCSAMS.SearchCommonParams
    >;

    type InfoDepartmentList = Common.PaginatingQueryRecord<InfoDepartment>;
    /** InfoMajor */
    export interface InfoMajor {
      code?: string;
      createTime?: Date;
      deleted?: number;
      departmentId?: number;
      description?: string;
      id?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
    }
    type InfoMajorSearchParams = CommonType.RecordNullable<
      Pick<InfoMajor, 'departmentId' | 'code' | 'name'> & Api.CommonCSAMS.SearchCommonParams
    >;

    export interface InfoMajorVO {
      code?: string;
      createTime?: Date;
      deleted?: number;
      departmentId?: number;
      description?: string;
      id?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
      departmentName?: string;
    }
    type InfoMajorVOList = Common.PaginatingQueryRecord<InfoMajorVO>;
    /** InfoClass */
    export interface InfoClass {
      code?: string;
      createTime?: Date;
      deleted?: number;
      description?: string;
      id?: number;
      majorId?: number;
      name?: string;
      updateTime?: Date;
      [property: string]: any;
    }
    type InfoClassSearchParams = CommonType.RecordNullable<
      Pick<InfoClass, 'majorId' | 'code' | 'name'> & Api.CommonCSAMS.SearchCommonParams
    >;
    /** InfoClass */
    export interface InfoClassVO {
      code?: string;
      createTime?: Date;
      deleted?: number;
      description?: string;
      id?: number;
      majorId?: number;
      name?: string;
      updateTime?: Date;
      majorName?: string;
      [property: string]: any;
    }
    type InfoClassVOList = Common.PaginatingQueryRecord<InfoClassVO>;

    /** InfoPerson */
    export interface InfoPerson {
      classId?: number;
      code?: string;
      createTime?: Date;
      deleted?: number;
      departmentId?: number;
      email?: string;
      id?: number;
      majorId?: number;
      name?: string;
      phone?: string;
      updateTime?: Date;
      [property: string]: any;
    }
    type InfoPersonSearchParams = CommonType.RecordNullable<
      Pick<InfoPerson, 'departmentId' | 'majorId' | 'classId' | 'name' | 'code' | 'email' | 'phone'> &
        Api.CommonCSAMS.SearchCommonParams
    >; /** InfoPerson */
    export interface InfoPersonVO {
      classId?: number;
      code?: string;
      createTime?: Date;
      deleted?: number;
      departmentId?: number;
      email?: string;
      id?: number;
      majorId?: number;
      name?: string;
      phone?: string;
      updateTime?: Date;
      [property: string]: any;
      departmentName?: string;
      majorName?: string;
      className?: string;
    }
    type InfoPersonVOList = Common.PaginatingQueryRecord<InfoPersonVO>;
  }

  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'> &
        CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };
  }
}
