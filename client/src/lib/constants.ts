export const EVENT_DATE = new Date('September 15, 2025 00:00:00');
export const EVENT_END_DATE = new Date('September 17, 2025 17:00:00');
export const EVENT_LOCATION = 'National Convention Center, 123 Statistical Avenue, Data City';

export const REGISTRATION_TYPES = {
  EARLY_BIRD: {
    name: 'Early Bird Registration',
    price: 599,
    regularPrice: 749,
    discount: '20%',
    deadline: 'July 31, 2025',
    description: 'Full access to all sessions, workshops, networking events, and resources.'
  },
  STUDENT: {
    name: 'Student Registration',
    price: 299,
    description: 'Special rate for full-time students with valid ID.',
    note: 'Student ID verification required'
  },
  REGULAR: {
    name: 'Regular Registration',
    price: 749,
    description: 'Full access to all sessions, workshops, networking events, and resources.'
  },
  GROUP: {
    name: 'Group Registration',
    description: 'Discounts available for 5+ attendees from the same organization.',
    note: 'Contact us for pricing'
  }
};

export const PROFESSIONAL_ROLES = [
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'statistician', label: 'Statistician' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'academic', label: 'Professor/Academic' },
  { value: 'student', label: 'Student' },
  { value: 'policy-maker', label: 'Policy Maker' },
  { value: 'other', label: 'Other' }
];

export const CONTACT_INFO = {
  address: 'National Convention Center\n123 Statistical Avenue\nData City, DC 10101',
  email: 'info@ncs2025.org',
  phone: '+1 (123) 456-7890'
};
