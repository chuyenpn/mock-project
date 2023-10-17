import create from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  isLoading: false,
  login: async (username, password) => {
    set({ isLoading: true });

    if (username === 'admin' && password === 'admin') {
      set({ isLoading: false });
      set({ isLoggedIn: true });
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ isLoggedIn: false });
    localStorage.removeItem('isLoggedIn');
  },
}));

const initAuthStore = () => {
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  useAuthStore.setState({ isLoggedIn: storedIsLoggedIn === 'true' });
};

initAuthStore();
