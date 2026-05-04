import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = 'http://localhost:3001/api/prompts';

// Fetch Prompts with optional search/filtering
export const usePrompts = (params = {}) => {
  return useQuery({
    queryKey: ['prompts', params],
    queryFn: async () => {
      const url = new URL(API_BASE);
      // Clean undefined params
      Object.keys(params).forEach(key => {
        if (params[key]) url.searchParams.append(key, params[key]);
      });
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });
};

// Increment Copy Count
export const useCopyPrompt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_BASE}/${id}/copy`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to copy');
      return res.json();
    },
    // Optimistic update or refetch
    onSuccess: () => {
      // Invalidate both paginated and list queries
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
    },
  });
};