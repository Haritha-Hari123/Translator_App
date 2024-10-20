function translateText() {
    const inputText = document.getElementById('inputText').value;
    const targetLang = document.getElementById('targetLang').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
  
    // Show loading animation
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';
  
    fetch('/translate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: new URLSearchParams({
        'text': inputText,
        'target_lang': targetLang
      })
    })
      .then(response => response.json())
      .then(data => {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = `<h2>Translated:</h2><p>${data.translated_text}</p>`;
      })
      .catch(error => {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }
  
  // CSRF token helper function
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  