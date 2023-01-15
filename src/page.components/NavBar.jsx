import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Receipt, RequestQuote, ContactPage, Handshake, HistoryEdu } from "@mui/icons-material";


export default function NavBar(width){
    const drawerWidth = width;
    const menuList = [
        {
            name:'Dashboard',
            icon:<Receipt />
        },
        {
            name:'Invoices',
            icon:<Receipt />
        },
        {
            name:'Estimates',
            icon:<RequestQuote />
        },
        {
            name:'Proposal',
            icon:<Handshake />
        },
        {
            name:'Customers',
            icon:<ContactPage />
        },
        {
            name:'Service Agreement',
            icon:<HistoryEdu />
        },
    ]
    const menu = (
        <>
        <Toolbar />
        <Divider/>
        <List>
            {menuList.map(({name, icon})=>(
                <ListItem key={name} >
                    <ListItemButton aria-selected sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <ListItemIcon sx={{display:'flex',  justifyContent:'center'}}>{icon}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            ))
            }
        </List>
        </>
    )
    return <>
        <Drawer
            variant="permanent"
             sx={{
               display: { xs: 'none',  sm: 'none', lg:'block' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
             }}
            open
        >
            {menu}
        </Drawer>
    </>
}