

interface SeedDoctor {
    name: string,
    phone: string,
    speciality: string,
    fee: number,
}


interface SeedData {
    doctor: SeedDoctor[];
}


export const initialData: SeedData = {


    doctor: [
        {
            name: 'Dr. John Doe',
            phone: '123-456-7890',
            speciality: 'Cardiologist',
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
    ]
}