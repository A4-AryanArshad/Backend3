<script>
  document.getElementById('wf-form-Freelancer-Form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const getVal = (id) => document.getElementById(id)?.value || '';

    const applicationData = {
      fullName: getVal('Full-Name-2'),
      email: getVal('Email-Address-2'),
      phone: getVal('Phone-Number-2'),
      location: getVal('Location-2'),
      role: getVal('Role-Position'),
      category: getVal('Category-2'),
      hourlyRate: getVal('Hourly-Rate-2'),
      experience: getVal('Experience-2'),
      description: getVal('Freelancer-Description'),
      skills: getVal('Skills-2'),
      photoSquare: getVal('Photo-Square-2'),
      photoPortrait: getVal('Photo-Portrait-2'),
      portfolios: [
        {
          title: getVal('Portfolio-1-Title'),
          image: getVal('Portfolio-1-Image'),
          link: getVal('Portfolio-1-Link'),
          description: getVal('Portfolio-1-Description')
        },
        {
          title: getVal('Portfolio-2-Title'),
          image: getVal('Portfolio-2-Image'),
          link: getVal('Portfolio-2-Link'),
          description: getVal('Portfolio-2-Description')
        }
      ]
    };

    const applicantId = localStorage.getItem('userId');
    if (!applicantId) {
      alert("You're not logged in. Please log in before submitting the form.");
      return;
    }

    try {
      const response = await fetch('https://backend3-brown.vercel.app/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'applicant-id': applicantId
        },
        body: JSON.stringify(applicationData)
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Show Webflow success message
        document.querySelector('.w-form-done').style.display = 'block';
        document.querySelector('.w-form-fail').style.display = 'none';
        document.getElementById('wf-form-Freelancer-Form').style.display = 'none';
      } else {
        // ❌ Show Webflow error message
        document.querySelector('.w-form-fail').style.display = 'block';
        document.querySelector('.w-form-done').style.display = 'none';
      }
    } catch (err) {
      console.error('Fetch error:', err);
      document.querySelector('.w-form-fail').style.display = 'block';
      document.querySelector('.w-form-done').style.display = 'none';
    }
  });
</script>
