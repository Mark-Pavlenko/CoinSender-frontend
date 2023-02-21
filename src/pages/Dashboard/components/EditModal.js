import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "16px",
	boxShadow: 24,
	p: 4,
};

export default function EditModal({ open, handleClose, user }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const closeModal = () => {
		handleClose(false);
	};

	const validationSchema = Yup.object().shape({
		amount: Yup.string().required("Is required"),
	});

	const initialValuesForCompany = {
		amount: user.amount,
		notes: user.notes || "",
	};

	const { handleChange, handleSubmit, isValid, values, setFieldValue } = useFormik({
		initialValues: initialValuesForCompany,
		validationSchema,
		onSubmit: (values) => {
			dispatch({
				type: "EDIT_TRANSFER_SAGA",
				payload: {
					...{ ...user, amount: values.amount.toString(), notes: values.notes },
				},
			});
			handleClose(false);
		},
	});

	useEffect(() => {
		setFieldValue("amount", user.amount);
		setFieldValue("notes", user.notes);
	}, [user]);

	return (
		<div>
			<Modal open={open} onClose={closeModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style} component='form' onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<Typography>Edit employee</Typography>
						{/*<TextField*/}
						{/*  fullWidth*/}
						{/*  label={t("name")}*/}
						{/*  name="name"*/}
						{/*  value={values.name}*/}
						{/*  onChange={handleChange}*/}
						{/*/>*/}
						{/*<TextField*/}
						{/*  fullWidth*/}
						{/*  label={t("surname")}*/}
						{/*  name="second_name"*/}
						{/*  value={values.second_name}*/}
						{/*  onChange={handleChange}*/}
						{/*/>*/}
						<TextField
							fullWidth
							type='number'
							label={t("amount")}
							inputProps={{
								step: "any",
								min: "0.001",
							}}
							name='amount'
							value={values.amount}
							onChange={handleChange}
						/>
						<TextField fullWidth label={t("Notes")} name='notes' value={values.notes} onChange={handleChange} />
						<Stack direction='row' gap={2}>
							<Button
								type='submit'
								sx={{ height: "30px" }}
								disabled={!isValid}
								variant='contained'
								// disabled={isValid}
							>
								{t("Edit")}
							</Button>
							<Button onClick={closeModal} sx={{ height: "30px" }} variant='contained'>
								{t("cancel")}
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
