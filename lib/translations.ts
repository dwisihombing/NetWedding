export const translations = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_details: 'Details',
    nav_gallery: 'Gallery',
    nav_rsvp: 'RSVP',
    
    // Cinematic
    cinematic_coming_soon: 'Coming Soon',
    cinematic_ready: 'Get ready for an unforgettable celebration',
    
    // Home/Hero
    hero_married: '#VANdmyJULIet',
    hero_days: 'Days',
    hero_until: 'until the big day',
    hero_play: 'Play',
    hero_more_info: 'More Info',
    
    // Details
    details_title: 'Wedding Details',
    details_ceremony: 'Holy Matrimony',
    details_reception: 'Reception',
    
    // Gallery
    gallery_title: 'Gallery',
    gallery_coming_soon: 'Gallery coming soon with your wedding photos!',
    
    // RSVP
    rsvp_title: 'RSVP',
    rsvp_full: 'Répondez S\'il Vous Plaît',
    rsvp_subtitle: 'Please let us know if you can join us',
    rsvp_name: 'Name',
    rsvp_name_placeholder: 'Your name',
    rsvp_phone: 'Phone Number',
    rsvp_phone_placeholder: '08xxxxxxxxxx',
    rsvp_attend_label: 'Will you attend?',
    rsvp_attend_undecided: 'Not sure yet',
    rsvp_attend_matrimony: 'Holy Matrimony Only',
    rsvp_attend_reception: 'Reception Only',
    rsvp_attend_both: 'Both (Matrimony & Reception)',
    rsvp_attend_no: 'Sorry, can\'t make it',
    rsvp_guests_label: 'How many guests (including you)?',
    rsvp_submit: 'Submit',
    rsvp_submitting: 'Submitting...',
    rsvp_success: 'Thank you! Your RSVP has been received.',
    rsvp_error: 'Something went wrong. Please try again.',
  },
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_details: 'Detail Acara',
    nav_gallery: 'Galeri',
    nav_rsvp: 'RSVP',
    
    // Cinematic
    cinematic_coming_soon: 'Segera Hadir',
    cinematic_ready: 'Bersiaplah untuk perayaan yang tak terlupakan',
    
    // Home/Hero
    hero_married: '#VANdmyJULIet',
    hero_days: 'Hari',
    hero_until: 'menuju hari bahagia',
    hero_play: 'Putar',
    hero_more_info: 'Info Lanjut',
    
    // Details
    details_title: 'Detail Pernikahan',
    details_ceremony: 'Pemberkatan',
    details_reception: 'Resepsi',
    
    // Gallery
    gallery_title: 'Galeri',
    gallery_coming_soon: 'Galeri foto pernikahan akan segera hadir!',
    
    // RSVP
    rsvp_title: 'Kehadiran',
    rsvp_full: 'Répondez S\'il Vous Plaît',
    rsvp_subtitle: 'Beritahu kami jika Anda bisa hadir',
    rsvp_name: 'Nama',
    rsvp_name_placeholder: 'Nama Anda',
    rsvp_phone: 'Nomor Telepon',
    rsvp_phone_placeholder: '08xxxxxxxxxx',
    rsvp_attend_label: 'Apakah Anda akan hadir?',
    rsvp_attend_undecided: 'Belum pasti',
    rsvp_attend_matrimony: 'Hanya Pemberkatan',
    rsvp_attend_reception: 'Hanya Resepsi',
    rsvp_attend_both: 'Keduanya (Pemberkatan & Resepsi)',
    rsvp_attend_no: 'Maaf, tidak bisa hadir',
    rsvp_guests_label: 'Berapa orang yang hadir (termasuk Anda)?',
    rsvp_submit: 'Kirim',
    rsvp_submitting: 'Mengirim...',
    rsvp_success: 'Terima kasih! RSVP Anda telah diterima.',
    rsvp_error: 'Terjadi kesalahan. Silakan coba lagi.',
  }
}

export type Language = 'en' | 'id'
export type TranslationKey = keyof typeof translations.en
