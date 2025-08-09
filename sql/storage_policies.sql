-- Create private bucket 'photos' in Storage UI first, then apply these policies:
create policy if not exists "read own photos"
on storage.objects for select
to authenticated
using (bucket_id = 'photos' and split_part(name, '/', 1) = auth.uid()::text);

create policy if not exists "upload own photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'photos' and split_part(name, '/', 1) = auth.uid()::text);

create policy if not exists "update own photos"
on storage.objects for update
to authenticated
using (bucket_id = 'photos' and split_part(name, '/', 1) = auth.uid()::text);

create policy if not exists "delete own photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'photos' and split_part(name, '/', 1) = auth.uid()::text);
