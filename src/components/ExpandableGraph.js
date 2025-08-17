import React, { useState, useMemo, useCallback } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
const extraRenderers = [new CSS2DRenderer()];
const ExpandableGraph = ({ graphData, rootId = "0" }) => {
    const nodesById = useMemo(() => {
        const map = Object.fromEntries(graphData.nodes.map(n => [n.id, n]));
        graphData.nodes.forEach(node => {
            node.collapsed = node.id !== rootId;
            node.childLinks = [];
        });
        graphData.links.forEach(link => {
            const src = typeof link.source === "object" ? link.source.id : link.source;
            const tgt = typeof link.target === "object" ? link.target.id : link.target;
            map[src].childLinks.push({ ...link, source: map[src], target: map[tgt] });
        });
        return map;
    }, [graphData, rootId]);

    const getPrunedTree = useCallback(() => {
        const visibleNodes = [];
        const visibleLinks = [];
        (function traverse(node = nodesById[rootId]) {
            visibleNodes.push(node);
            if (node.collapsed) return;
            node.childLinks.forEach(l => {
                visibleLinks.push(l);
                traverse(l.target);
            });
        })();
        return { nodes: visibleNodes, links: visibleLinks };
    }, [nodesById, rootId]);

    const [prunedTree, setPrunedTree] = useState(getPrunedTree);

    const handleNodeClick = useCallback(
        (node) => {
            node.collapsed = !node.collapsed;
            setPrunedTree(getPrunedTree());
        },
        [getPrunedTree]
    );

    return (
        <ForceGraph3D
            extraRenderers={extraRenderers}
            graphData={prunedTree}
            linkDirectionalParticles={2}
            nodeAutoColorBy={node => node.group}
            onNodeClick={handleNodeClick}
            nodeThreeObject={node => {
                const nodeEl = document.createElement('div');
                nodeEl.style.color = node.color;
                nodeEl.className = 'node-label';
                nodeEl.textContent = node.label;
                return new CSS2DObject(nodeEl);
            }}
            nodeThreeObjectExtend={true}
        />
    );
};

export default ExpandableGraph;
