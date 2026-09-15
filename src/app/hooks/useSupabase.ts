import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';


export default function useSupabase(channelName: string): [ RealtimeChannel, SupabaseClient ] {
	const [ channel, setChannel ] = useState<RealtimeChannel>();
	const [ supabase, setSupabase ] = useState<SupabaseClient>();

	useEffect(() => {
		const _supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_KEY
		);
		const _channel = _supabase.channel(channelName);

		setChannel( _channel );
		setSupabase( _supabase );

		return () => {
			supabase.removeChannel(_channel)
		}
	}, []);

	return [ channel, supabase ];
}