import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { addProductSchema, type addProductType } from "../schema/product";
import { Categories } from "../type/product";
import { useProducts } from "../hook/useProducts";

const AddProductDialog = ({ open = false, setOpenDialog}) => {
  const {loadings : {addingProduct}, addProduct, getList} =useProducts();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<addProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      imageUrl: "https://picsum.photos/seed/tshirt/400/400",
    },
  });

  const onSubmit = async(data: addProductType) => {
   const result = await addProduct(data);
   if(result) {
    await getList()
    setOpenDialog(false);
   }
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "20px" }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product Name"
              placeholder="Insert a name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              placeholder="Insert a description"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              placeholder="Insert the price"
              onChange={(e) => field.onChange(+e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <Select {...field} displayEmpty>
                <MenuItem disabled value="">
                  Select Category
                </MenuItem>
                {Object.values(Categories).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.category?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stock"
              type="number"
              placeholder="Insert the stock"
              onChange={(e) => field.onChange(+e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
          )}
        />

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Image URL"
              placeholder="Insert an image URL"
              fullWidth
              margin="normal"
              error={!!errors.imageUrl}
              helperText={errors.imageUrl?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" loading={addingProduct} color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Dialog>
  );
};

export default AddProductDialog;