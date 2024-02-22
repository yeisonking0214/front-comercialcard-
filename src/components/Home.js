import React, {useEffect} from 'react';
import DialogListInformation from './dialog-list-information/DialogListInformation'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const Home = () => 
{
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <React.Fragment>
            <h1>Hello word</h1>
            <DialogListInformation  
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose} 
            />
        </React.Fragment>
    );
};
export default Home;