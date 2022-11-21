import loader from '../../../assets/images/loading__.gif'

export const Preloader = () => {
    return (
        <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%', zIndex: 999}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={loader} alt={'preloader'}/>
            </div>
        </div>
    );
};