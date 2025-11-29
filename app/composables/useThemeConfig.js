export const useThemeConfig = () => {
  const state = useState('themeConfig')
  return { ...state.value }
}