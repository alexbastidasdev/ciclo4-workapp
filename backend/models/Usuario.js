import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    token: {type: String},
    confirmado: {type: Boolean, default: false},
}, {
    timestamps: true // This will add createdAt and updatedAt fields to the schema
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next(); // sirve para que no se ejecute el resto de la funcion ypase al siguiente middleware
    } 

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // la diferencia entre hashear y encriptar es que el hash es un algoritmo de una sola via, no se puede desencriptar
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
     return await bcrypt.compare(passwordFormulario, this.password); // sirve para comparar el password que el usuario envia con el que esta en la base de datos
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;