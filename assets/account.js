(() => {
  const { createClient } = supabase;
  const SUPABASE_URL = 'https://gohyhxqvcjdthxvpewrx.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1';
  const db = createClient(SUPABASE_URL, SUPABASE_KEY);

  let currentUser = null;

  // ── DOM refs ──────────────────────────────────────────
  const avatarWrap     = document.getElementById('avatarWrap');
  const avatarImg      = document.getElementById('avatarImg');
  const avatarFallback = document.getElementById('avatarFallback');
  const avatarEditHint = document.getElementById('avatarEditHint');
  const avatarInput    = document.getElementById('avatarInput');
  const avatarBtn      = document.getElementById('avatarBtn');
  const avatarStatus   = document.getElementById('avatarStatus');
  const handleInput    = document.getElementById('handleInput');
  const handleBtn      = document.getElementById('handleBtn');
  const handleStatus   = document.getElementById('handleStatus');

  // ── Crop modal refs ───────────────────────────────────
  const cropModal      = document.getElementById('cropModal');
  const cropCanvas     = document.getElementById('cropCanvas');
  const cropCanvasWrap = document.getElementById('cropCanvasWrap');
  const cropZoom       = document.getElementById('cropZoom');
  const cropCancel     = document.getElementById('cropCancel');
  const cropSave       = document.getElementById('cropSave');
  const cropStatusMsg  = document.getElementById('cropStatus');
  const ctx            = cropCanvas.getContext('2d');

  // ── Crop editor state ─────────────────────────────────
  const CANVAS_SIZE = 320;
  const CROP_RADIUS = 140;
  let cropImg      = null;
  let pan          = { x: 0, y: 0 };
  let scale        = 1;
  let minScale     = 1;
  let isDragging   = false;
  let dragStart    = { x: 0, y: 0 };
  let panStart     = { x: 0, y: 0 };

  // ── Avatar helpers ────────────────────────────────────
  function showAvatarImg(url) {
    avatarImg.src = url;
    avatarImg.classList.remove('hidden');
    avatarFallback.classList.add('hidden');
    avatarEditHint.classList.remove('hidden');
    avatarWrap.classList.add('has-photo');
  }

  function syncNavAvatar(url) {
    const navAvatarImg = document.getElementById('navAvatarImg');
    const navAvatarIcon = document.getElementById('navAvatarIcon');
    if (!navAvatarImg || !navAvatarIcon || !currentUser) return;
    navAvatarImg.src = url;
    navAvatarImg.classList.remove('hidden');
    navAvatarIcon.classList.add('hidden');
    try {
      localStorage.setItem(`pc-avatar:${currentUser.id}`, url.split('?')[0]);
      localStorage.removeItem('pc-avatar');
    } catch(e) {}
  }

  function setStatus(el, msg, ok) {
    el.textContent = msg;
    el.classList.remove('text-primary-fixed-dim', 'text-error');
    el.classList.add(ok ? 'text-primary-fixed-dim' : 'text-error');
  }

  // ── Load profile from DB ──────────────────────────────
  async function loadProfile(userId) {
    const { data, error } = await db
      .from('profiles')
      .select('handle, avatar_url')
      .eq('id', userId)
      .single();

    // No row yet — user predates the auto-create trigger
    if (error && error.code === 'PGRST116') {
      await db.from('profiles').insert({ id: userId, email: currentUser.email });
      return;
    }

    if (!data) return;

    if (data.handle) {
      handleInput.value = data.handle;
    }

    if (data.avatar_url) {
      showAvatarImg(data.avatar_url + '?t=' + Date.now());
    }
  }

  // ── Profile row update helper ─────────────────────────
  async function saveProfileField(fields) {
    const { data: updData, error: updError } = await db
      .from('profiles')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', currentUser.id)
      .select('id');

    if (updError) return updError;

    if (!updData || updData.length === 0) {
      const { error: insError } = await db
        .from('profiles')
        .insert({ id: currentUser.id, email: currentUser.email, ...fields });
      return insError || null;
    }

    return null;
  }

  // ── Crop editor: draw ─────────────────────────────────
  function drawCrop() {
    if (!cropImg) return;
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Image
    ctx.save();
    ctx.translate(cx + pan.x, cy + pan.y);
    ctx.scale(scale, scale);
    ctx.drawImage(cropImg, -cropImg.naturalWidth / 2, -cropImg.naturalHeight / 2);
    ctx.restore();

    // Dim everything outside the crop circle
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.arc(cx, cy, CROP_RADIUS, 0, Math.PI * 2, true); // CCW = hole
    ctx.fill('evenodd');
    ctx.restore();

    // Crop circle border
    ctx.beginPath();
    ctx.arc(cx, cy, CROP_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(42,168,255,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // ── Crop editor: clamp pan so image always covers circle ──
  function clampPan() {
    if (!cropImg) return;
    const halfW = (cropImg.naturalWidth  * scale) / 2;
    const halfH = (cropImg.naturalHeight * scale) / 2;
    const maxX  = Math.max(0, halfW - CROP_RADIUS);
    const maxY  = Math.max(0, halfH - CROP_RADIUS);
    pan.x = Math.max(-maxX, Math.min(maxX, pan.x));
    pan.y = Math.max(-maxY, Math.min(maxY, pan.y));
  }

  // ── Crop editor: open ─────────────────────────────────
  function openCropModal(src) {
    cropStatusMsg.textContent = '';
    cropStatusMsg.classList.remove('text-primary-fixed-dim', 'text-error');
    cropZoom.value = 100;

    const img = new Image();
    // Only remote (https) URLs need crossOrigin to keep the canvas un-tainted.
    // blob: and data: URLs are same-origin — adding crossOrigin causes a CORS
    // failure because there is no HTTP server to return Access-Control headers.
    if (src.startsWith('http')) img.crossOrigin = 'anonymous';
    img.onload = () => {
      cropImg = img;
      // Minimum scale ensures the crop circle is fully covered
      minScale = Math.max(
        (CROP_RADIUS * 2) / img.naturalWidth,
        (CROP_RADIUS * 2) / img.naturalHeight
      );
      scale = minScale;
      pan   = { x: 0, y: 0 };
      drawCrop();
      cropModal.setAttribute('aria-hidden', 'false');
    };
    img.onerror = () => {
      setStatus(avatarStatus, 'Could not load image — try again.', false);
    };
    img.src = src;
  }

  function closeCropModal() {
    cropModal.setAttribute('aria-hidden', 'true');
    cropImg = null;
    avatarInput.value = '';
    cropSave.disabled  = false;
    cropCancel.disabled = false;
  }

  // ── Crop editor: zoom slider ──────────────────────────
  cropZoom.addEventListener('input', () => {
    scale = minScale * (cropZoom.value / 100);
    clampPan();
    drawCrop();
  });

  // ── Crop editor: mouse drag ───────────────────────────
  cropCanvasWrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart  = { x: e.clientX, y: e.clientY };
    panStart   = { x: pan.x, y: pan.y };
    cropCanvasWrap.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pan.x = panStart.x + (e.clientX - dragStart.x);
    pan.y = panStart.y + (e.clientY - dragStart.y);
    clampPan();
    drawCrop();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    cropCanvasWrap.classList.remove('dragging');
  });

  // ── Crop editor: touch drag ───────────────────────────
  cropCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    isDragging = true;
    dragStart  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStart   = { x: pan.x, y: pan.y };
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    pan.x = panStart.x + (e.touches[0].clientX - dragStart.x);
    pan.y = panStart.y + (e.touches[0].clientY - dragStart.y);
    clampPan();
    drawCrop();
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchend', () => { isDragging = false; });

  // ── Crop editor: cancel ───────────────────────────────
  cropCancel.addEventListener('click', closeCropModal);

  // Close on overlay click (outside the modal box)
  cropModal.addEventListener('click', (e) => {
    if (e.target === cropModal) closeCropModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cropModal.getAttribute('aria-hidden') === 'false') {
      closeCropModal();
    }
  });

  // ── Crop editor: save ─────────────────────────────────
  cropSave.addEventListener('click', async () => {
    if (!cropImg || !currentUser) return;

    cropSave.disabled   = true;
    cropCancel.disabled = true;
    setStatus(cropStatusMsg, 'Saving…', true);

    // Render cropped circle to an offscreen canvas
    const D = CROP_RADIUS * 2;
    const out = document.createElement('canvas');
    out.width  = D;
    out.height = D;
    const oc = out.getContext('2d');

    oc.beginPath();
    oc.arc(CROP_RADIUS, CROP_RADIUS, CROP_RADIUS, 0, Math.PI * 2);
    oc.clip();

    oc.save();
    oc.translate(CROP_RADIUS + pan.x, CROP_RADIUS + pan.y);
    oc.scale(scale, scale);
    oc.drawImage(cropImg, -cropImg.naturalWidth / 2, -cropImg.naturalHeight / 2);
    oc.restore();

    out.toBlob(async (blob) => {
      if (!blob) {
        setStatus(cropStatusMsg, 'Crop failed — try again.', false);
        cropSave.disabled  = false;
        cropCancel.disabled = false;
        return;
      }

      const path = `${currentUser.id}/avatar`;

      const { error: uploadError } = await db.storage
        .from('avatars')
        .upload(path, blob, { upsert: true, contentType: 'image/png' });

      if (uploadError) {
        setStatus(cropStatusMsg, `Upload failed: ${uploadError.message || 'try again'}`, false);
        cropSave.disabled  = false;
        cropCancel.disabled = false;
        return;
      }

      const { data: { publicUrl } } = db.storage.from('avatars').getPublicUrl(path);

      const saveError = await saveProfileField({ avatar_url: publicUrl });

      if (saveError) {
        setStatus(cropStatusMsg, `Save failed: ${saveError.message || saveError.code || 'unknown'}`, false);
        cropSave.disabled  = false;
        cropCancel.disabled = false;
        return;
      }

      showAvatarImg(publicUrl + '?t=' + Date.now());
      syncNavAvatar(publicUrl + '?t=' + Date.now());
      setStatus(avatarStatus, 'Photo updated.', true);
      closeCropModal();
    }, 'image/png');
  });

  // ── File selection → open crop modal ─────────────────
  avatarBtn.addEventListener('click', () => avatarInput.click());

  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    if (file.size > 5 * 1024 * 1024) {
      setStatus(avatarStatus, 'File too large — max 5 MB.', false);
      avatarInput.value = '';
      return;
    }

    // Use FileReader so the browser reads the bytes immediately.
    // createObjectURL can silently fail for iCloud files that aren't
    // downloaded locally yet, because the blob URL exists but has no data.
    const reader = new FileReader();
    reader.onload = (ev) => openCropModal(ev.target.result); // data: URL
    reader.onerror = () => {
      setStatus(avatarStatus, 'Could not read file — it may not be downloaded yet.', false);
      avatarInput.value = '';
    };
    reader.readAsDataURL(file);
  });

  // ── Click existing photo → re-crop ────────────────────
  avatarWrap.addEventListener('click', () => {
    if (avatarImg.classList.contains('hidden') || !currentUser) return;
    // Strip any cache-bust params and re-add a fresh one for CORS
    const base = avatarImg.src.split('?')[0];
    openCropModal(base + '?cb=' + Date.now());
  });

  // ── Handle save ───────────────────────────────────────
  handleBtn.addEventListener('click', async () => {
    const raw = handleInput.value.trim().toLowerCase();
    handleInput.value = raw;

    if (!raw) {
      setStatus(handleStatus, 'Enter a handle first.', false);
      return;
    }

    if (!/^[a-z0-9_]{1,30}$/.test(raw)) {
      setStatus(handleStatus, 'Letters, numbers, underscores only. Max 30 chars.', false);
      return;
    }

    setStatus(handleStatus, 'Checking availability…', true);
    handleBtn.disabled = true;

    // Check if another user already owns this handle (case-insensitive via ilike)
    const { data: taken } = await db
      .from('profiles')
      .select('id')
      .ilike('handle', raw)
      .neq('id', currentUser.id)
      .maybeSingle();

    if (taken) {
      setStatus(handleStatus, 'That handle is already taken.', false);
      handleBtn.disabled = false;
      return;
    }

    setStatus(handleStatus, 'Saving…', true);

    const error = await saveProfileField({ handle: raw });

    handleBtn.disabled = false;

    if (error) {
      const msg = error.code === '23505'
        ? 'That handle is already taken.'
        : `Save failed: ${error.message || error.code || 'try again'}`;
      setStatus(handleStatus, msg, false);
      return;
    }

    setStatus(handleStatus, `@${raw} saved.`, true);
  });

  handleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleBtn.click();
  });

  // ── Auth guard ────────────────────────────────────────
  db.auth.getUser()
    .then(({ data: { user }, error }) => {
      if (error || !user) {
        window.location.replace('/login.html');
        return;
      }
      currentUser = user;

      document.getElementById('userEmail').textContent   = user.email;
      document.getElementById('userId').textContent      = user.id;
      const created = new Date(user.created_at);
      document.getElementById('memberSince').textContent =
        created.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

      document.getElementById('mainContent').classList.remove('is-invisible');
      document.getElementById('signOutBtn').classList.remove('is-invisible');

      loadProfile(user.id);
    })
    .catch(() => window.location.replace('/login.html'));

  db.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      window.location.replace('/login.html');
    }
  });

  document.getElementById('signOutBtn').addEventListener('click', async () => {
    try { await db.auth.signOut(); } catch {}
    window.location.replace('/login.html');
  });
})();
