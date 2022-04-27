import React from "react";

export const ayuda = () => {
  return <div>ayuda</div>;
};

// import {
// 	OutlinedInput,
// 	InputAdornment,
// 	IconButton,
// 	FormHelperText,
// 	InputLabel,
// 	FormControl
// } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { Controller, Control } from 'react-hook-form';
// import React, { ChangeEvent, useState } from 'react';

// interface Props {
// 	control: Control<any>;
// 	defaultValue?: string;
// 	setPassword?: React.Dispatch<React.SetStateAction<string>>;
// 	secondValidation?: boolean;
// }

// export default function PasswordInput({
// 	control,
// 	defaultValue,
// 	setPassword,
// 	secondValidation = false
// }: Props) {
// 	const [showPassword, setShowPassword] = useState(false);
// 	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		if (setPassword) {
// 			setPassword(e.target.value);
// 		}
// 	};

// 	return (
// 		<Controller
// 			name='password'
// 			control={control || null}
// 			rules={{
// 				required: `Por favor coloca tu contraseña`,
// 				minLength: { value: 8, message: 'Requiere un mínimo de 8 caracteres' }
// 			}}
// 			render={({ field: { onChange, value }, fieldState: { error } }) => (
// 				<FormControl variant='outlined' sx={{ width: '100%' }}>
// 					<InputLabel htmlFor='outlined-adornment-password' sx={{ paddingTop: '10px' }}>
// 						Contraseña*
// 					</InputLabel>
// 					<OutlinedInput
// 						sx={{ margin: '10px 0px' }}
// 						type={showPassword ? 'text' : 'password'}
// 						onChange={(e) => {
// 							onChange(e);
// 							if (secondValidation) {
// 								handleChange(e);
// 							}
// 						}}
// 						value={value}
// 						fullWidth
// 						error={Boolean(error)}
// 						label='Contraseña*'
// 						endAdornment={
// 							<InputAdornment position='end'>
// 								<IconButton
// 									aria-label='toggle password visibility'
// 									onClick={() => setShowPassword(!showPassword)}
// 									onMouseDown={(e) => e.preventDefault()}
// 									edge='end'
// 								>
// 									{showPassword ? <VisibilityOff /> : <Visibility />}
// 								</IconButton>
// 							</InputAdornment>
// 						}
// 					/>
// 					<FormHelperText error id='accountId-error'>
// 						{error?.message}
// 					</FormHelperText>
// 				</FormControl>
// 			)}
// 			defaultValue={defaultValue}
// 		/>
// 	);
// }
