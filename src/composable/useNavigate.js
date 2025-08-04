import { useScrollUp } from '@/composable/useScrollUp';
import { useMovieStore } from '@/stores/MovieStore';
import { useRouter } from 'vue-router';

export function useNavigate(path) {
  const MovieStore = useMovieStore();
  const router = useRouter();

  return (path) => { 
    MovieStore.resetCurrentPage();
    useScrollUp();
    router.push(path);
  };
}