import React, {useEffect} from 'react';
import DialogListInformation from './dialog-list-information/DialogListInformation'
import ButtonAppBar from './app-bar/AppBar'

const emails = ['username@gmail.com', 'user02@gmail.com'];
const Home = () => 
{
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <React.Fragment>
            <ButtonAppBar />
            <DialogListInformation
                open={open}
                onClose={handleClose} 
            />
        </React.Fragment>
    );
};
export default Home;