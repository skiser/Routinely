// EventNotifManager.m
#import "EventNotifManager.h"
#import <React/RCTLog.h>

@implementation EventNotifManager

// To export a module named EventNotifManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)id, (NSString *)title, (NSString *)notes, (NSDate *)chosenDate, (Boolean *)Sun, Boolean *)Mon, (Boolean *)Mon, (Boolean *)Tue, (Boolean *)Wed, (Boolean *)Thu, (Boolean *)Fri, (Boolean *)Sat)
{
    NSString *location = [RCTConvert NSString:details[@"location"]];
    // NSDate *time = [RCTConvert NSDate:chosenDate[@"time"]];
    NSDateComponents *triggerDate = [[NSCalendar currentCalendar]   
                components:NSCalendarUnitYear +
                NSCalendarUnitMonth + NSCalendarUnitDay +
                NSCalendarUnitHour + NSCalendarUnitMinute +
                NSCalendarUnitSecond fromDate:chosenDate];
    UNCalendarNotificationTrigger *trigger = [UNCalendarNotificationTrigger triggerWithDateMatchingComponents:triggerDate
                                            repeats:NO];
    NSString *identifier = @"UYLLocalNotification";
    UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier
                                    content:content trigger:trigger]

    [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
        if (error != nil) {
            NSLog(@"Something went wrong: %@",error);
        }
    }];
    UNNotificationAction *snoozeAction = [UNNotificationAction actionWithIdentifier:@"Snooze"
    title:@"Snooze" options:UNNotificationActionOptionNone];
    UNNotificationAction *deleteAction = [UNNotificationAction actionWithIdentifier:@"Delete"
    title:@"Delete" options:UNNotificationActionOptionDestructive];
    UNNotificationCategory *category = [UNNotificationCategory categoryWithIdentifier:@"UYLReminderCategory"
    actions:@[snoozeAction,deleteAction] intentIdentifiers:@[]
    options:UNNotificationCategoryOptionNone];
    NSSet *categories = [NSSet setWithObject:category];
    [center setNotificationCategories:categories];
    content.categoryIdentifier = @"UYLReminderCategory";
}


@end
