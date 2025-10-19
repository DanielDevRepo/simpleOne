import { Dialog, Input } from "@mui/material";

const AddProductDialog = ({open = false}) => {

    


    return (
        <Dialog
            open={open}>
            <form>
                <label></label>
                <Input type="text"/>

            </form>
        </Dialog>
    )
}



export default AddProductDialog;