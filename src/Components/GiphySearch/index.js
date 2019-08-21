import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import GiphyGallery from '../GiphyGallery';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const GiphySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [submitSearchTerm, setSubmitSearchTerm] = useState("");

    const classes = useStyles();
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const search = (e) => {
        e.preventDefault();
        setSubmitSearchTerm(searchTerm);
    }
    return (
        <div>
            <Paper className={classes.root}>
                    <Typography>GiphySearch</Typography>
                    <form className="giphy-form" noValidate autoComplete="off"
                        onSubmit={search}
                    >
                        <TextField
                            id="outlined-full-width"
                            label="Search Giphy"
                            style={{ marginTop: 8 }}
                            placeholder="Press 'enter' to search"
                            fullWidth
                            margin="none"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleSearchChange}
                        />
                    </form>

                    <GiphyGallery search={submitSearchTerm} />
            </Paper>
        </div>
    );
};

export default GiphySearch;
