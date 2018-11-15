chrome.alarms.onAlarm.addListener(() => {
  // Create reminder
  const numberOfReminders = window.localStorage.length - 1
  const key = String(Math.floor(Math.random() * numberOfReminders))
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'clock_512.png',
    title: 'Remember:',
    message: window.localStorage.getItem(key),
    priority: 0
  })

  // Recursively queue next reminder
  chrome.storage.sync.get(['minutesUntilReminder'], item => {
    chrome.alarms.create({ delayInMinutes: item.minutesUntilReminder })
  })
})
