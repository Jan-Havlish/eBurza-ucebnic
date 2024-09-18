import TextFromCloud from "./TextFromCloud";

const Footer = () => {
return (
    <footer className="bg-agRed w-full mt-auto">
        
        <div className="flex justify-center mt-2 text-wrap">
        <TextFromCloud colId="cloud_settings" docId="footer" />
        </div>
        <div className="flex justify-center mt-4">
        <img src="https://agkm.cz/images/fotky/obecne/spaglogo.png" width="200" className="m-4" alt="Logo SPAGu"/>
        <img src="https://agkm.cz/templates/glips/images/logo2.png" className="m-4" alt="Logo školy"/>
        </div>
    </footer>
);};

export default Footer;
