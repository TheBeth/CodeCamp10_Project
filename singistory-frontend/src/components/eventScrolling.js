import { ImageList, ImageListItem } from "@mui/material";
import AllEvent from "../pages/event/allEvent";
import '../css/eventScrolling.css'

function EventScrolling({interests}) {
    return (
            <ImageList
                sx={{ width: '100%', height: 350, display:'flex', flexWrap: 'wrap' ,cursor:'grab'}}
                variant="standard"
                cols={1}
                rowHeight={200}
            >
                <ImageListItem sx={{display:'flex'}}>
                    <AllEvent interest={interests}/>
                </ImageListItem>
            </ImageList>
    )
}

export default EventScrolling;