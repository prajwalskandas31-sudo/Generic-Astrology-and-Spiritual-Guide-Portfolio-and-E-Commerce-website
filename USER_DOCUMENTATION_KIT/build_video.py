import os
import subprocess

screenshots = [
    ('01-admin-dashboard.png', '1. Admin Dashboard - Command Center & Metrics Overview'),
    ('01-offerings-list.png', '2. Services & Consultations - Pujas, Homas & Astrology Offerings'),
    ('02-offering-form.png', '3. Adding & Editing Offerings - Custom Slugs, Images & Descriptions'),
    ('01-workshops-list.png', '4. Workshops & Batches - Automatic Seat Decrementing & Pricing'),
    ('01-classes-list.png', '5. Structured Chanting Classes - Online, Offline & Hybrid Learning'),
    ('02-courses-list.png', '6. Comprehensive Vedic Courses - Instant WhatsApp Broadcasts'),
    ('03-live-events-list.png', '7. Live Streams & Online Sankalpa - Virtual Devotee Registration'),
    ('01-blogs-list.png', '8. Spiritual Articles CMS - Publishing Sacred Wisdom & SEO'),
    ('02-media-library.png', '9. Centralized Media Library - One-Click Reusable Image Vault'),
    ('01-gallery-list.png', '10. Public Photo & Video Gallery - Visual Ritual Portfolio'),
    ('01-enquiries-list.png', '11. Enquiries & Registrations - Live Tracking & Status Badges'),
    ('02-accepted-schedule.png', '12. Accepted Schedule - Calendar of Confirmed Services'),
    ('02-reviews-list.png', '13. Client Reviews - Testimonial Moderation & Approval'),
    ('03-settings-panel.png', '14. Site Settings - Contact Numbers, WhatsApp Setup & Password Security')
]

script_dir = os.path.dirname(os.path.abspath(__file__))
screenshots_dir = os.path.join(script_dir, 'screenshots')
recordings_dir = os.path.join(script_dir, 'recordings')
os.makedirs(recordings_dir, exist_ok=True)
temp_video_parts = []

print("Rendering high-definition video slides for each chapter from:", screenshots_dir)

for idx, (img_name, title) in enumerate(screenshots):
    img_path = os.path.join(screenshots_dir, img_name)
    if not os.path.exists(img_path):
        print(f"Warning: {img_path} not found! Skipping...")
        continue
    part_output = os.path.join(recordings_dir, f"part_{idx:02d}.mp4")
    
    # Scale to standard 1920x1080 canvas with elegant dark letterboxing
    # Each slide is displayed for 8 seconds (totaling nearly 2 minutes of complete walkthrough)
    cmd = [
        "ffmpeg", "-y", "-loop", "1", "-i", img_path,
        "-t", "8",
        "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#0f172a",
        "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
        part_output
    ]
    subprocess.run(cmd, check=True)
    temp_video_parts.append(part_output)

# Create concat list
concat_list_path = os.path.join(recordings_dir, "concat_parts.txt")
with open(concat_list_path, "w", encoding="utf-8") as f:
    for part in temp_video_parts:
        f.write(f"file '{part.replace(os.sep, '/')}'\n")

final_output = os.path.join(recordings_dir, "master_admin_tutorial_walkthrough.mp4")
print("Concatenating into master video:", final_output)

subprocess.run([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list_path,
    "-c", "copy", final_output
], check=True)

# Also overwrite master_admin_walkthrough.mp4 for convenience
master_alt = os.path.join(recordings_dir, "master_admin_walkthrough.mp4")
subprocess.run([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list_path,
    "-c", "copy", master_alt
], check=True)

# Clean up temp parts
for part in temp_video_parts:
    try:
        os.remove(part)
    except:
        pass
if os.path.exists(concat_list_path):
    os.remove(concat_list_path)

print("SUCCESS! Master tutorial video created at:", final_output)
