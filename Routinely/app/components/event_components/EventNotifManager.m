// EventNotifManager.m
#import "EventNotifManager.h"
#import <React/RCTLog.h>

@implementation EventNotifManager

// To export a module named EventNotifManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end