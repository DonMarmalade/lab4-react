import styles from "./ThemeSwitcher.module.css";
import { lightMode, darkMode } from '@assets/icons/index.js'

function ThemeSwitcher({ theme, onClick }) {
    return (
        <button onClick={onClick} className={styles.iconButton} aria-label="Toggle theme">
            <img
                src={theme === 'dark' ? lightMode : darkMode}
                alt="theme"
            />
        </button>
    );
}

export default ThemeSwitcher;