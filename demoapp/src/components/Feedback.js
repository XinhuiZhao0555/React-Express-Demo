import React, { useState } from 'react';
import { createTheme } from '@mui/material';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Grid from "@mui/material/Grid";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function Feedback() {
    const theme = createTheme();
    const [comment, setComment] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    const validateComment = (value) => {
        setComment(value);
        if(!value) setBtnDisabled(true);
        else setBtnDisabled(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                marginTop: theme.spacing(10),
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography component="h1" variant="h5">
                    Feedback
                </Typography>
                <form style={{
                    width: "100%", // Fix IE 11 issue.
                    margin: theme.spacing(3)
                }}
                    noValidate
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StyledRating
                                name="highlight-selected-only"
                                defaultValue={3}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                id="comment"
                                label="Comment"
                                name="comment"
                                value={comment}
                                onChange={(e) => validateComment(e.target.value)}
                                onBlur={(e) => validateComment(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: theme.spacing(3, 0, 2) }}
                        disabled={btnDisabled}
                    >
                        Sumbit
                    </Button>
                </form>
            </div>
        </Container>
    )
}