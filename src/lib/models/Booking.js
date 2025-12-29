import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },

    durationValue: { type: Number, required: true },
    durationUnit: { type: String, enum: ['hours', 'days'], required: true },

    division: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },

    totalCost: { type: Number, required: true },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
)

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)