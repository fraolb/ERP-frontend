import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/inventory/manage/all');
  const data = await res.json();

  return {
    props: { ninjas: data }
  }
}

export const ItemsAdd = (data) => {

  const formik = useFormik({
    initialValues: {
      inventory_name: '',
      inventory_price: '',
      least_critical_amount: '',
      inventory_quantity: '',
      inventory_expense: ''
    },
    validationSchema: Yup.object({
      inventory_name: Yup.string()
        .max(255)
        .required("inventory_name is required"),
        inventory_price: Yup.string()
        .max(255)
        .required("inventory_price type is required"),

        least_critical_amount: Yup.string().max(255).required("least_critical_amount"),
        inventory_quantity: Yup.string().max(255).required("inventory_quantity"),
        inventory_expense: Yup.string().max(255).required("inventory_expense"),
    }),


    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
     
      fetch(
        "http://localhost:5000/api/inventory/manage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer "+sessionStorage.getItem("token"),
          },
          body: JSON.stringify(values, null, 2),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          //handle data
          console.log(data);

          if (data.status == 200) {
            console.log("yaay")
            location.reload()
            // Router.push("/customers");
          } else alert("Incorrect Data");
        })
        .catch((error) => {
          //handle error
        });
    
      
    },
});

/******data fetch */
const [item1, setItem1] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/inventory/manage", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },
   
  })
  .then(response => response.json())
      
  .then(data => setItem1(data.data))
  
  console.log(item1)
},[])

///////////////

  return (
    <>
  
    
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="The information is very critical while working your so mind it"
          title="Add Item"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={2.5}
              xs={5}
            >
              <TextField
              error={Boolean(
                formik.touched.inventory_name && formik.errors.inventory_name
              )}
                fullWidth
                helperText="Please specify the inventory_name"
                label="inventory_name"
                name="inventory_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.inventory_name}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={4}
            >
              <TextField
                error={Boolean(
                  formik.touched.inventory_price && formik.errors.inventory_price
                )}
                fullWidth
                label="inventory_price"
                name="inventory_price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.inventory_price}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={4}
            >
              <TextField
                error={Boolean(
                  formik.touched.least_critical_amount && formik.errors.least_critical_amount
                )}
                fullWidth
                label="Minimum no. to get Notified"
                name="least_critical_amount"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.least_critical_amount}
                
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={4}
            >
              <TextField
                 error={Boolean(
                  formik.touched.inventory_quantity && formik.errors.inventory_quantity
                )}
                fullWidth
                label="inventory_quantity"
                name="inventory_quantity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.inventory_quantity}
           
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={4}
            >
              <TextField
                 error={Boolean(
                  formik.touched.inventory_expense && formik.errors.inventory_expense
                )}
                fullWidth
                label="inventory_expense"
                name="inventory_expense"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.inventory_expense}
                type="number"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
         <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
            Add
          </Button>
        </Box>
      </Card>
    </form>
    <div>Hello
     
    </div>
    </>
  );
};


