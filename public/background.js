chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'clock.png',
    title: 'Reminder!',
    message: 'Test message.',
    priority: 0
  })
})
