import React, { useState, useEffect } from 'react';
import './FormTurnoNuevo.css';

interface FormTurnoNuevoProps {
    fechaInicial: Date | null; // Fecha inicial recibida como prop
}

const FormTurnoNuevo: React.FC<FormTurnoNuevoProps> = ({ fechaInicial }) => {
    const [fecha, setFecha] = useState<Date | null>(fechaInicial);
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');
    const [otroMotivo, setOtroMotivo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [descPersonal, setDescPersonal] = useState('');
    const [mostrarCamposPersonales, setMostrarCamposPersonales] = useState(true);

    // Verificamos el estado del token cuando el componente se monta
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && token !== 'estoestavencido') {
            setMostrarCamposPersonales(false); // Ocultamos los campos personales
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');

        // Solo realizamos el POST si la sesión está iniciada
        if (token && token !== 'estoestavencido') {
            const data = {
                fecha: fecha ? fecha.toISOString().split('T')[0] : '',
                hora,
                motivo: motivo === 'otro' ? otroMotivo : motivo,
                descripcion,
            };

            try {
                const response = await fetch('https://oliver-six.vercel.app/perfil', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Incluimos el token en los headers
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log('Datos enviados con éxito');
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        } else {
            console.log('Sesión no iniciada, no se enviarán los datos.');
        }
    };

    return (
        <form className="contenidoformturno" onSubmit={handleSubmit}>
            <h2 className="margentop">Llena el formulario con tus datos</h2>
            <div>
                <div className="form-group">
                    <label>Fecha:</label>
                    <input 
                        type="date" 
                        value={fecha ? fecha.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFecha(new Date(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Hora:</label>
                    <input 
                        type="time" 
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Motivo:</label>
                    <select 
                        value={motivo} 
                        onChange={(e) => {
                            setMotivo(e.target.value);
                            if (e.target.value !== 'otro') {
                                setOtroMotivo(''); // Resetea el otro motivo si no es 'otro'
                            }
                        }} 
                        required
                    >
                        <option value="">Seleccione un motivo</option>
                        <option value="cita romantica">Cita romántica</option>
                        <option value="masterclass">Masterclass</option>
                        <option value="futbol">Fútbol</option>
                        <option value="otro">Otro</option>
                    </select>
                    {motivo === 'otro' && (
                        <input 
                            type="text" 
                            placeholder="Especificar motivo"
                            value={otroMotivo}
                            onChange={(e) => setOtroMotivo(e.target.value)} 
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Descripción sobre la cita:</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>

                {/* Solo mostramos estos campos si no hay una sesión iniciada */}
                {mostrarCamposPersonales && (
                    <>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                type="text" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input 
                                type="text" 
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción personal:</label>
                            <textarea 
                                value={descPersonal}
                                onChange={(e) => setDescPersonal(e.target.value)} 
                                required 
                            />
                        </div>
                    </>
                )}
                
                <div className="button-group">
                    <button type="button">Cancelar</button>
                    <button type="submit">Enviar</button>
                </div>
            </div>
        </form>
    );
};

export default FormTurnoNuevo;
