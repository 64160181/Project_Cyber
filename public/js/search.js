function load_data(query = '') {
    if (query.trim() === '') {
      document.getElementById('search_result').innerHTML = '';
      return;
    }
    
    Promise.all([
      fetch('/search_data?search_query=' + query),
      fetch('/search_users?search_query=' + query)
    ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(responseData => {
        const [topicsData, usersData] = responseData;
  
        let html = '';
  
        // แสดงหัวข้อกระทู้
        if (topicsData.length > 0) {
          html += '<h4>หัวข้อกระทู้</h4>';
          topicsData.forEach(topic => {
            const escapedTopic = escapeHtml(topic.topic);
            const safeTopic = escapedTopic.replace(new RegExp('(' + query + ')', 'gi'),
              (match) => `<span class="text-primary">${match}</span>`);
              html += `<a href="/show_post/${topic.id}" class="list-group-item" onclick="get_text(this); setSearchValue(this.textContent)">${safeTopic}</a><br>`;
          });
        }
        
        // แสดงผู้ใช้
        if (usersData.length > 0) {
          html += '<h4>ผู้ใช้งาน</h4>';
          usersData.forEach(user => {
            const escapedUsername = escapeHtml(user.username);
            const safeUsername = escapedUsername.replace(new RegExp('(' + query + ')', 'gi'),
              (match) => `<span class="text-primary">${match}</span>`);
              html += `<a href="/profile/${user.uid}" class="list-group-item user-profile-link" onclick="get_text(this); setSearchValue(this.textContent)">${safeUsername}</a><br>`;
          });
        }

        // // ใช้ jQuery สำหรับการจัดการกับการคลิกที่ลิงก์โปรไฟล์ผู้ใช้
        // $(document).on('click', '.user-profile-link', function(e) {
        //   e.preventDefault();
        //   var userId = $(this).data('user-id');
        //   $.ajax({
        //     url: '/profile/' + userId,
        //     type: 'GET',
        //     success: function(data) {
        //       // แสดงหน้าโปรไฟล์โดยใช้ข้อมูลที่ได้รับ
        //       // คุณจะต้องปรับแต่งโค้ดนี้ให้เหมาะสมกับการจัดการข้อมูลของคุณ
        //       $('#profile').html(`<h1>${data.user.username}</h1>`);
        //     }
        //   });
        // });
        
        // if (html === '') {
        //   html += '<a href="#" class="list-group-item list-group-item-action disabled">ไม่พบข้อมูล</a>';
        // }
  
        document.getElementById('search_result').innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  var search_element = document.getElementById("autocomplete_search");
  
      search_element.onkeyup = function(){
  
          var query = search_element.value;
  
          load_data(query);
  
      };
  
      search_element.onfocus = function(){
  
          var query = search_element.value;
  
          load_data(query);
  
      };
  
      function get_text(event) {
        var topic = event.textContent;
    
        // นำคำค้นหาที่ได้ไปใส่ในช่องค้นหา
        document.getElementById('autocomplete_search').value = topic;
    
        // ล้างรายการผลลัพธ์ที่แสดง
        document.getElementById('sear ch_result').innerHTML = '';
    
        // โหลดข้อมูลที่เกี่ยวข้องกับคำค้นหาใหม่
        load_data(topic);
    }
  
  // ฟังก์ชันสำหรับ escape HTML
  function escapeHtml(unsafeString) {
    return unsafeString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }