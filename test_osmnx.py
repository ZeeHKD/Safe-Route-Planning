import osmnx as ox
import networkx as nx

# 1. Download walking network for Liverpool
G = ox.graph_from_place("Liverpool, UK", network_type="walk")

# 2. Add edge lengths (correct for OSMnx 1.x)
ox.distance.add_edge_lengths(G)

# 3. Choose two points in Liverpool (lat, lon)
start = (53.4084, -2.9916)
end   = (53.4020, -2.9790)

# 4. Convert coordinates to nearest graph nodes
orig = ox.distance.nearest_nodes(G, start[1], start[0])
dest = ox.distance.nearest_nodes(G, end[1], end[0])

# 5. Compute shortest path
route = nx.shortest_path(G, orig, dest, weight="length")

# 6. Plot ONLY the route
ox.plot_graph_route(G, route)
