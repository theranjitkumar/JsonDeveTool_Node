document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('jsoneditor');
    const errorDiv = document.getElementById('error');

    if (!container) {
        console.error('JSON Editor container not found');
        return;
    }

    // Initialize the editor with more options
    const options = {
        mode: 'code',
        modes: ['code', 'tree', 'form', 'text', 'view'],
        onError: function (err) {
            console.error('JSON Editor Error:', err);
            if (errorDiv) {
                errorDiv.textContent = 'Error: ' + err.toString();
                errorDiv.style.display = 'block';
            }
        },
        onModeChange: function (newMode, oldMode) {
            console.log('Mode switched from', oldMode, 'to', newMode);
        }
    };

    try {
        // Create the editor
        const editor = new JSONEditor(container, options);

        // Try to parse the JSON data from data attribute
        try {
            const jsonString = container.getAttribute('data-json');
            if (jsonString) {
                const jsonData = JSON.parse(jsonString);
                editor.set(jsonData);
            } else {
                // Initialize with empty object if no data
                editor.set({});
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            if (errorDiv) {
                errorDiv.textContent = 'Error parsing JSON: ' + parseError.message;
                errorDiv.style.display = 'block';
            }
            // Set empty JSON if parsing fails
            editor.set({});
        }

        // Auto-resize the editor when window is resized
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                editor.refresh();
            }, 250);
        });

        // Export editor instance for debugging/access from console
        window.jsonEditor = editor;

    } catch (initError) {
        console.error('Error initializing JSON Editor:', initError);
        if (errorDiv) {
            errorDiv.textContent = 'Failed to initialize JSON Editor: ' + initError.message;
            errorDiv.style.display = 'block';
        }
    }
});