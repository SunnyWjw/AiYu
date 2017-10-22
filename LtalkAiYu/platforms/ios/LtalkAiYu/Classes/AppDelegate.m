/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  LtalkAiYu
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

//#import "EMMSecurity/EMMSecurity.h"
#import "EMMSecurity.h"

#define EMMAppid @"A00202"

@interface AppDelegate ()<EMMSecurityVerifyDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
//    self.viewController = [[MainViewController alloc] init];
//    return [super application:application didFinishLaunchingWithOptions:launchOptions];

    [[EMMSecurity share] applicationLaunchingWithAppId:EMMAppid];
    [EMMSecurity share].delegate = self;
    return YES;
}
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    return [[EMMSecurity share] applicationHandleOpenURL:url];
}

#pragma mark EMMSecurityVerifyDelegate

/**
 *  安全认证失败
 *
 *  @param errorCode 错误码
 *
 *  TokenNotFound = 0   没有读取到token 如果是MOA需要跳转到登录界面，如果是其他程序自动跳转到MOA去登录
 *  TokenInvalidate     读取到token 校验后token失效
 *  EncryptionError     加密串校验失败
 *  PasswordError       用户名密码校验失败
 *
 *  @param errorMsg  错误提示语
 */
- (void)securityVerifyFailureWithCode:(NSInteger)errorCode errorMsg:(NSString *)errorMsg
{
    NSLog(@"securityVerifyFailure,errorCode =%d,errorMsg = %@",errorCode,errorMsg);
    if (errorCode == PasswordError) {
        NSLog(@">>>>>");
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:@"密码错误" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil];
        [alert show];
    }else{
         NSLog(@"<<<<<<");
    }
    
}

/**
 *  安全验证成功
 *
 *  @param verifyType (TokenVerify = 0,EncryptionVerify,PasswordVerify,SSOVerify)
 */
- (void)securityVerifySuccess:(NSInteger)verifyType
{
    NSLog(@"securityVerifySuccess verifyType = %d",verifyType);
    if ( verifyType == TokenVerify || verifyType == EncryptionVerify || verifyType == PasswordVerify) {
        self.window.rootViewController = [[UIStoryboard storyboardWithName:@"Main" bundle:nil] instantiateViewControllerWithIdentifier:@"MainViewController"];
    }
}



@end
