// Example data for NetWedding

export const exampleGuests = [
  {
    id: '1',
    unique_slug: 'ABC123',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    rsvp_status: 'confirmed',
    group_size: 2,
    dietary_restrictions: 'None',
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    unique_slug: 'DEF456',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+0987654321',
    rsvp_status: 'pending',
    group_size: 1,
    dietary_restrictions: 'Vegetarian',
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
  },
  {
    id: '3',
    unique_slug: 'GHI789',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1122334455',
    rsvp_status: 'declined',
    group_size: 1,
    dietary_restrictions: 'None',
    created_at: '2024-01-03',
    updated_at: '2024-01-10',
  },
]

export const exampleRSVPResponses = [
  {
    id: '1',
    guest_slug: 'ABC123',
    name: 'John Smith',
    email: 'john@example.com',
    attendance: 'confirmed',
    group_size: 2,
    dietary_restrictions: 'None',
    message: 'Looking forward to celebrating with you!',
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: '2',
    guest_slug: 'DEF456',
    name: 'Jane Doe',
    email: 'jane@example.com',
    attendance: 'confirmed',
    group_size: 1,
    dietary_restrictions: 'Vegetarian',
    message: 'Cannot wait for the big day!',
    created_at: '2024-01-20',
    updated_at: '2024-01-20',
  },
]

export const exampleWeddingInfo = {
  id: '1',
  couple_name_first: 'John',
  couple_name_second: 'Jane',
  wedding_date: '2024-12-25',
  wedding_location: 'Grand Hotel Ballroom, Downtown',
  wedding_description:
    'We are delighted to invite you to celebrate our marriage. Join us for an elegant ceremony followed by a reception with dinner, dancing, and celebration with loved ones.',
  groom_photo_url: '/images/groom.jpg',
  bride_photo_url: '/images/bride.jpg',
  ceremony_time: '14:00',
  reception_time: '18:00',
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
}

export const galleryPlaceholders = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Wedding Moment ${i + 1}`,
  description: 'A beautiful moment from our wedding day',
  image_url: ``,
  category: ['ceremony', 'reception', 'portrait', 'candid'][i % 4],
}))
