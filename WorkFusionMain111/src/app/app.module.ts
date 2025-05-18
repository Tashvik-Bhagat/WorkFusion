import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { ClientComponent } from './client/client.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { AddManagerComponent } from './admin/manager/add-manager/add-manager.component';
import { UpdateManagerComponent } from './admin/manager/update-manager/update-manager.component';
import { ListManagerComponent } from './admin/manager/list-manager/list-manager.component';
import { AddClientComponent } from './admin/client/add-client/add-client.component';
import { UpdateClientComponent } from './admin/client/update-client/update-client.component';
import { ListClientComponent } from './admin/client/list-client/list-client.component';
import { OuterHomeComponent } from './outer/outer-home/outer-home.component';
import { OuterAboutComponent } from './outer/outer-about/outer-about.component';
import { SignupFormComponent } from './outer/signup-form/signup-form.component';
import { ServicesComponent } from './outer/services/services.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layout/admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout/admin-layout/admin-footer/admin-footer.component';
import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout.component';
import { EmployeeHeaderComponent } from './layout/employee-layout/employee-header/employee-header.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { ClientHeaderComponent } from './layout/client-layout/client-header/client-header.component';
import { ClientFooterComponent } from './layout/client-layout/client-footer/client-footer.component';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { ManagerHeaderComponent } from './layout/manager-layout/manager-header/manager-header.component';
import { ManagerFooterComponent } from './layout/manager-layout/manager-footer/manager-footer.component';
import { OuterLayoutComponent } from './layout/outer-layout/outer-layout.component';
import { FooterComponent } from './layout/outer-layout/footer/footer.component';
import { HeaderComponent } from './layout/outer-layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './outer/admin-login/admin-login.component';
import { EmployeeLoginComponent } from './outer/employee-login/employee-login.component';
import { ClientLoginComponent } from './outer/client-login/client-login.component';
import { ManagerLoginComponent } from './outer/manager-login/manager-login.component';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './services/authentication.service';
import { EmployeeSideBarComponent } from './layout/employee-layout/employee-side-bar/employee-side-bar.component';
import { EmployeehomeComponent } from './employee/employeehome/employeehome.component';
import { EmployeeattendanceComponent } from './employee/employeeattendance/employeeattendance.component';
import { EmployeeprojectsComponent } from './employee/employeeprojects/employeeprojects.component';
import { EmployeeperformanceComponent } from './employee/employeeperformance/employeeperformance.component';
import { AdminSideBarComponent } from './layout/admin-layout/admin-side-bar/admin-side-bar.component';
import { EmployeeFooterComponent } from './layout/employee-layout/employee-footer/employee-footer.component';
import { ManagerSideBarComponent } from './layout/manager-layout/manager-side-bar/manager-side-bar.component';
import { EmployeeService } from './services/employee.service';
import { AdminService } from './services/admin.service';
import { UserRequestsComponent } from './admin/user-requests/user-requests.component';
import { ListDepartmentComponent } from './admin/department/list-department/list-department.component';
import { UpdateDepartmentComponent } from './admin/department/update-department/update-department.component';
import { AddDepartmentComponent } from './admin/department/add-department/add-department.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientSideBarComponent } from './layout/client-layout/client-side-bar/client-side-bar.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { RequestProjectsComponent } from './client/projects/request-projects/request-projects.component';
import { RequestNewProjectsComponent } from './client/projects/request-new-projects/request-new-projects.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { UpdateRequestedProjectsComponent } from './client/projects/update-requested-projects/update-requested-projects.component';
import { ChatComponent } from './client/chat/chat/chat.component';
import { JoinRoomComponent } from './client/chat/join-room/join-room.component';
import { WelcomeComponent } from './client/chat/welcome/welcome.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { ManagerChatComponent } from './manager/chat/manager-chat/manager-chat.component';
import { ManagerJoinRoomComponent } from './manager/chat/manager-join-room/manager-join-room.component';
import { ManagerWelocomeComponent } from './manager/chat/manager-welocome/manager-welocome.component';
import { ClientProfileComponent } from './client/profile/client-profile/client-profile.component';
import { ClientProfileUpdateComponent } from './client/profile/client-profile-update/client-profile-update.component';
import { ClientSettingsComponent } from './client/settings/client-settings/client-settings.component';
import { ClientResetPasswordComponent } from './client/settings/client-reset-password/client-reset-password.component';
import { EmployeeProfileUpdateComponent } from './employee/profile/employee-profile-update/employee-profile-update.component';
import { EmployeeprofileComponent } from './employee/profile/employeeprofile/employeeprofile.component';
import { EmployeeSettingsComponent } from './employee/settings/employee-settings/employee-settings.component';
import { EmployeeResetPasswordComponent } from './employee/settings/employee-reset-password/employee-reset-password.component';
import { ManagerSettingsComponent } from './manager/settings/manager-settings/manager-settings.component';
import { ManagerResetPasswordComponent } from './manager/settings/manager-reset-password/manager-reset-password.component';
import { ManagerProfileComponent } from './manager/profile/manager-profile/manager-profile.component';
import { ManagerProfileUpdateComponent } from './manager/profile/manager-profile-update/manager-profile-update.component';
import { EmployeeChatComponent } from './employee/chat/employee-chat/employee-chat.component';
import { EmployeeWelcomeComponent } from './employee/chat/employee-welcome/employee-welcome.component';
import { EmployeeJoinRoomComponent } from './employee/chat/employee-join-room/employee-join-room.component';
import { ForgotPasswordComponent } from './outer/forgot-password/forgot-password.component';
import { AdminProfileComponent } from './admin/profile/admin-profile/admin-profile.component';
import { ListAllProjectsComponent } from './manager/projects/list-all-projects/list-all-projects.component';
import { ProjectsRequestsComponent } from './manager/projects/projects-requests/projects-requests.component';
import { AddProjectsComponent } from './manager/projects/add-projects/add-projects.component';
import { ListProjectsComponent } from './client/projects/list-projects/list-projects.component';
import { UpdateProjectsComponent } from './manager/projects/update-projects/update-projects.component';
import { AdminProfileUpdateComponent } from './admin/profile/admin-profile-update/admin-profile-update.component';
import { AllTeamMembersComponent } from './manager/teamMember/all-team-members/all-team-members.component';
import { TeamMemberComponent } from './manager/teamMember/team-member/team-member.component';
import { AddNewTaskComponent } from './manager/tasks/add-new-task/add-new-task.component';
import { UpdateTaskComponent } from './manager/tasks/update-task/update-task.component';
import { ListAllTasksComponent } from './manager/tasks/list-all-tasks/list-all-tasks.component';
import { ViewTaskComponent } from './manager/tasks/view-task/view-task.component';
import { ViewEmpTaskComponent } from './employee/tasks/view-emp-task/view-emp-task.component';
import { ListAllEmpTasksComponent } from './employee/tasks/list-all-emp-tasks/list-all-emp-tasks.component';
import { UpdateEmpTaskComponent } from './employee/tasks/update-emp-task/update-emp-task.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { AdminHomeComponent } from './admin/home/admin-home/admin-home.component';
import { AllProjectsComponent } from './admin/home/all-projects/all-projects.component';
import { DepartmentsProjectsComponent } from './admin/home/departments-projects/departments-projects.component';
import { DepartmentsEmployeesComponent } from './admin/home/departments-employees/departments-employees.component';
import { AdminAllProjectsComponent } from './admin/projects/admin-all-projects/admin-all-projects.component';
import { AdminChatComponent } from './admin/chat/admin-chat/admin-chat.component';
import { AdminJoinRoomComponent } from './admin/chat/admin-join-room/admin-join-room.component';
import { AdminWelcomeComponent } from './admin/chat/admin-welcome/admin-welcome.component';
import { ManagerNotificationComponent } from './manager/manager-notification/manager-notification.component';
import { EmployeeNotificationComponent } from './employee/employee-notification/employee-notification.component';
import { AdminNotificationComponent } from './admin/admin-notification/admin-notification.component';
import { EmployeeLeaveRequestsComponent } from './employee/employee-leave-requests/employee-leave-requests.component';
import { ApprovedLeavesComponent } from './manager/Leaves/approved-leaves/approved-leaves.component';
import { PendingLeavesComponent } from './manager/Leaves/pending-leaves/pending-leaves.component';
import { RejectedLeavesComponent } from './manager/Leaves/rejected-leaves/rejected-leaves.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ManagerComponent,
    ClientComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ListEmployeeComponent,
    AddManagerComponent,
    UpdateManagerComponent,
    ListManagerComponent,
    AddClientComponent,
    UpdateClientComponent,
    ListClientComponent,
    AdminProfileUpdateComponent,
    AddProjectsComponent,
    ListProjectsComponent,
    UpdateProjectsComponent,
    OuterHomeComponent,
    OuterAboutComponent,
    SignupFormComponent,
    ServicesComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    EmployeeLayoutComponent,
    ClientLayoutComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    ManagerLayoutComponent,
    ManagerHeaderComponent,
    ManagerFooterComponent,
    OuterLayoutComponent,
    FooterComponent,
    HeaderComponent,
    AdminLoginComponent,
    EmployeeLoginComponent,
    ClientLoginComponent,
    ManagerLoginComponent,
    ManagerLoginComponent,
    EmployeeSideBarComponent,
    EmployeehomeComponent,
    EmployeeprofileComponent,
    EmployeeattendanceComponent,
    EmployeeprojectsComponent,
    EmployeeperformanceComponent,
    AdminSideBarComponent,
    EmployeeHeaderComponent,
    EmployeeFooterComponent,
    ManagerSideBarComponent,
    UserRequestsComponent,
    ListDepartmentComponent,
    UpdateDepartmentComponent,
    AddDepartmentComponent,
    ClientSideBarComponent,
    RequestProjectsComponent,
    RequestNewProjectsComponent,
    ClientHomeComponent,
    UpdateRequestedProjectsComponent,
    ChatComponent,
    JoinRoomComponent,
    WelcomeComponent,
    ManagerHomeComponent,
    ManagerChatComponent,
    ManagerJoinRoomComponent,
    ManagerWelocomeComponent,
    ClientProfileComponent,
    ClientProfileUpdateComponent,
    ClientSettingsComponent,
    ClientResetPasswordComponent,
    EmployeeProfileUpdateComponent,
    EmployeeSettingsComponent,
    EmployeeResetPasswordComponent,
    ManagerSettingsComponent,
    ManagerResetPasswordComponent,
    ManagerProfileComponent,
    ManagerProfileUpdateComponent,
    EmployeeChatComponent,
    EmployeeWelcomeComponent,
    EmployeeJoinRoomComponent,
    ForgotPasswordComponent,
    AdminProfileComponent,
    ListAllProjectsComponent,
    ProjectsRequestsComponent,
    AllTeamMembersComponent,
    TeamMemberComponent,
    AddNewTaskComponent,
    UpdateTaskComponent,
    ListAllTasksComponent,
    ViewTaskComponent,
    ViewEmpTaskComponent,
    ListAllEmpTasksComponent,
    UpdateEmpTaskComponent,
    AdminHomeComponent,
    AllProjectsComponent,
    DepartmentsProjectsComponent,
    DepartmentsEmployeesComponent,
    AdminAllProjectsComponent,
    AdminChatComponent,
    AdminJoinRoomComponent,
    AdminWelcomeComponent,
    ManagerNotificationComponent,
    EmployeeNotificationComponent,
    AdminNotificationComponent,
    EmployeeLeaveRequestsComponent,
    ApprovedLeavesComponent,
    PendingLeavesComponent,
    RejectedLeavesComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,// Add this module to the imports array
    FormsModule,          // Add FormsModule here
    HttpClientModule ,
    NgxChartsModule,
    jqxChartModule,
    MatSnackBarModule,
    BrowserAnimationsModule, // Include this module for animations
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Position of the toast messages
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    NgxSpinnerModule.forRoot(),
     // Other imports
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line
  providers: [UserService,
    AuthenticationService,
    EmployeeService,
    AdminService,
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true
    },
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
