import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { initialData } from './data';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
    @InjectModel(Appointment.name)
    private _appointmentModel: Model<Appointment>,
    @InjectModel(Patient.name)
    private patientModel: Model<Patient>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
  ) {}

  async excuteSeed() {
    await this._appointmentModel.deleteMany({});
    await this.doctorModel.deleteMany();
    await this.patientModel.deleteMany();
    await this.storeModel.deleteMany();
    const data = initialData;
    // Insertar doctores y pacientes y guardar los registros creados
    const createdDoctors = await this.doctorModel.insertMany(
      initialData.doctor,
    );
    const createdPatients = await this.patientModel.insertMany(
      initialData.patient,
    );

    // Insertar stores
    await this.storeModel.insertMany(initialData.store);

    // Crear citas con doctores y pacientes asignados de manera aleatoria
    const appointments = initialData.appointment.map((app) => ({
      ...app,
      doctorId: this.getRandomItem(createdDoctors)._id,
      patientId: this.getRandomItem(createdPatients)._id,
    }));

    // Insertar las citas en la base de datos
    await this._appointmentModel.insertMany(appointments);

    return 'Seed executed';
  }

  // Función para obtener un elemento al azar de un array
  private getRandomItem(arr: any[]): any {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
}
