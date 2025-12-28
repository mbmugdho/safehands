
const services = [
  {
    id: 'baby-care',
    name: 'Baby Care (Daytime)',
    category: 'Baby Care',
    shortDescription: 'Safe and playful daytime care for infants and toddlers.',
    description:
      'Our Baby Care service provides experienced caregivers to support infants and toddlers during the day. From feeding and diaper changes to playtime and naps, we focus on safety, hygiene, and emotional comfort.',
    pricePerHour: 15,
    pricePerDay: 90,
    image:
      'https://ik.imagekit.io/azfnpskmy/caregiver/bbsitting.jpg',
    tags: ['Feeding', 'Playtime', 'Nap supervision'],
  },
  {
    id: 'elderly-day',
    name: 'Elderly Day Support',
    category: 'Elderly Care',
    shortDescription: 'Daytime assistance and companionship for elderly family members.',
    description:
      'Elderly Day Support includes meal assistance, light mobility help, medication reminders, and friendly conversation. Ideal for families who need peace of mind while they are at work.',
    pricePerHour: 16,
    pricePerDay: 95,
    image:
      'https://ik.imagekit.io/azfnpskmy/caregiver/elderly01.jpg',
    tags: ['Medication reminder', 'Companionship', 'Mobility help'],
  },
  {
    id: 'elderly-night',
    name: 'Overnight Elderly Care',
    category: 'Elderly Care',
    shortDescription: 'Night-time supervision and safety monitoring at home.',
    description:
      'Overnight Elderly Care ensures continuous attention through the night. Caregivers can assist with bathroom visits, medication schedules, and emergency response.',
    pricePerHour: 18,
    pricePerDay: 105,
    image:
      'https://ik.imagekit.io/azfnpskmy/caregiver/elderly02.jpg',
    tags: ['Night supervision', 'Emergency support', 'Fall prevention'],
  },
  {
    id: 'sick-home',
    name: 'Sick People Home Support',
    category: 'Sick People Care',
    shortDescription: 'Home-based support for patients recovering or under treatment.',
    description:
      'Sick People Home Support focuses on non-medical assistance at home: monitoring comfort, helping with basic tasks, coordinating with family, and ensuring a clean and calm environment.',
    pricePerHour: 17,
    pricePerDay: 100,
    image:
      'https://ik.imagekit.io/azfnpskmy/caregiver/homesick.jpg',
    tags: ['Recovery support', 'Hygiene help', 'Family coordination'],
  },
]

export function getServices() {
  return services
}

export function getServiceById(id) {
  return services.find((s) => s.id === id)
}