# Smart Campus Navigation System

A web-based navigation system for campus environments, featuring pathfinding algorithms (BFS, DFS, Dijkstra) and accessibility options.

## 🚀 New Data Tools
We have added two powerful tools to help you create and manage the campus map data easier.

### 1. 🛰️ GPS Tracker (`tracker.html`)
**Best for:** Walking around and recording real-world coordinates.
*   **Mobile-Friendly**: Big buttons for easy use on phones.
*   **Features**: Record building locations (Points) and walkways (LineStrings) using your phone's GPS.
*   [**📖 Read the Tracker Guide**](tracker_guide.md)

### 2. 🗺️ Map Builder (`builder.html`)
**Best for:** Visual editing on a computer.
*   **Visual Interface**: Click on the map to add buildings or draw paths.
*   **Edit Data**: Load your existing data, make changes, and save.
*   [**📖 Read the Map Builder Guide**](map_builder_guide.md)

---


## 🛠️ Setup & Usage

### Option 1: GitHub Pages (Recommended)
Host this repository on GitHub Pages for the best experience (especially for the GPS Tracker).
1.  Push code to GitHub.
2.  Enable Pages in Settings.
3.  Access via `https://vaibhav-rm.github.io/rvce-navigation/`.

### Option 2: Local Development
To run locally, you need a simple web server (for fetching JSON files and GPS access):

```bash
# Run inside the project folder
python3 -m http.server 8000
```

*   **App**: `http://localhost:8000`
*   **Tracker**: `http://localhost:8000/tracker.html`
*   **Builder**: `http://localhost:8000/builder.html`

## 📂 Data Management
All map data is stored in `data/data.geojson`.

**To update the map:**
1.  Collect data using **Tracker** or **Builder**.
2.  Save the new `data.geojson` file into the `data/` folder.
3.  Run the processing script to update the graph:
    ```bash
    python3 processgeoJSON.py
    ```
