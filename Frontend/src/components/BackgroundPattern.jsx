import { motion } from 'framer-motion';

const BackgroundPattern = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-0 opacity-13">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hexagons' x='0' y='0' width='50' height='43.4' patternUnits='userSpaceOnUse'%3E%3Cpolygon fill='none' stroke='%23000000' stroke-width='0.5' points='24,1 49,12.8 49,35.9 24,47.7 -1,35.9 -1,12.8'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23hexagons)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 87px'
                }}></div>

            </motion.div>
        </div>
    );
};

export default BackgroundPattern;