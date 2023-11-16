interface SeedDoctor {
  name: string;
  phone: string;
  speciality: string;
  fee: number;
}

interface SeedPatient {
  name: string;
  phone: string;
}

interface SeedAppointment {
  date: string;
  fee: number;
  status: string;
  code: string;
  voucher: string;
}

interface SeedStore {
  documentId: string;
  fullname: string;
  phone: string;
  imageUrl: string;
  codeQr: string;
  lat: string;
  long: string;
}

export interface SeedAffiliate {
  documentId: string;
  fullname: string;
  phone: string;
}

interface SeedData {
  affiliate: SeedAffiliate[];
  store: SeedStore[];
  doctor: SeedDoctor[];
  patient: SeedPatient[];
  appointment: SeedAppointment[];
}

export const initialData: SeedData = {
  affiliate: [
    {
      documentId: '45888223',
      fullname: 'lucas martinez',
      phone: '6677887762',
    },
    {
      documentId: '45874232',
      fullname: 'John Doe',
      phone: '7766553344',
    },
    {
      documentId: '45898456',
      fullname: 'johny',
      phone: '7766550099',
    },
    {
      documentId: '87546543',
      fullname: 'obiwan kenobi',
      phone: '7755662345',
    },
  ],
  store: [
    {
      documentId: '45787777',
      fullname: 'La bodega1',
      phone: '987-654-1234',
      imageUrl: 'www.someimage.com',
      codeQr: 'a7sd7asd8as',
      lat: '2323',
      long: '787878',
    },
    {
      documentId: '45787756',
      fullname: 'La bodega2',
      phone: '987-654-8723',
      imageUrl: 'www.someimage.com',
      codeQr: 'a7sd7asd8as',
      lat: '2323',
      long: '787878',
    },
    {
      documentId: '87453345',
      fullname: 'La bodega3',
      phone: '987-623-5434',
      imageUrl: 'www.someimage.com',
      codeQr: 'a7sd7asd8as',
      lat: '2323',
      long: '787878',
    },
  ],
  doctor: [
    {
      name: 'Dr. Abel',
      phone: '51947308823',
      speciality: 'Nutrición',
      fee: 150,
    },
    {
      name: 'Dr. Jane Smith',
      phone: '987-654-3210',
      speciality: 'Dermatologist',
      fee: 120,
    },
    {
      name: 'Dr. Alan Turing',
      phone: '111-222-3333',
      speciality: 'Neurologist',
      fee: 180,
    },
    {
      name: 'Dr. Ada Lovelace',
      phone: '444-555-6666',
      speciality: 'Pediatrician',
      fee: 140,
    },
    {
      name: 'Dr. Grace Hopper',
      phone: '777-888-9999',
      speciality: 'Radiologist',
      fee: 170,
    },
    {
      name: 'Dr. Richard Feynman',
      phone: '222-333-4444',
      speciality: 'Physicist',
      fee: 165,
    },
    {
      name: 'Dr. Katherine Johnson',
      phone: '555-666-7777',
      speciality: 'Gynecologist',
      fee: 155,
    },
    {
      name: 'Dr. Carl Sagan',
      phone: '888-999-0000',
      speciality: 'Astronomer',
      fee: 190,
    },
    {
      name: 'Dr. Mary Jackson',
      phone: '999-000-1111',
      speciality: 'Endocrinologist',
      fee: 150,
    },
    {
      name: 'Dr. James Clerk Maxwell',
      phone: '000-111-2222',
      speciality: 'Electromagnetism',
      fee: 160,
    },
  ],
  patient: [
    {
      name: 'Paciente 1',
      phone: '125-456-7890',
    },
    {
      name: 'Paciente 2',
      phone: '988-654-3210',
    },
    {
      name: 'Paciente 3',
      phone: '535-555-5555',
    },
    {
      name: 'Paciente 4',
      phone: '171-222-3333',
    },
    {
      name: 'Paciente 5',
      phone: '999-888-7747',
    },
    {
      name: 'Paciente 6',
      phone: '333-333-4333',
    },
    {
      name: 'Paciente 7',
      phone: '777-777-7777',
    },
    {
      name: 'Paciente 8',
      phone: '444-444-4444',
    },
    {
      name: 'Paciente 9',
      phone: '666-666-6666',
    },
    {
      name: 'Paciente 10',
      phone: '222-222-2222',
    },
  ],
  appointment: [
    {
      date: '2023-10-12',
      fee: 50,
      status: '0',
      code: 'R1XDF',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-10-15',
      fee: 75,
      status: '0',
      code: 'R1LGO',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-10-18',
      fee: 60,
      status: '2',
      code: 'R1TY',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-10-20',
      fee: 80,
      status: '0',
      code: 'R1LO',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-10-25',
      fee: 55,
      status: '0',
      code: 'RQA1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-10-28',
      fee: 70,
      status: '0',
      code: 'ROG1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-11-02',
      fee: 65,
      status: '0',
      code: 'RLP1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-11-05',
      fee: 90,
      status: '0',
      code: 'Q3R1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-11-08',
      fee: 75,
      status: '2',
      code: 'P3R1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
    {
      date: '2023-11-12',
      fee: 50,
      status: '3',
      code: 'L5R1',
      voucher:
        'https://res.cloudinary.com/dbq85fwfz/image/upload/v1697751230/Imagen_de_WhatsApp_2023-10-16_a_las_21.03.28_10028c3a_bpdii7.jpg',
    },
  ],
};
