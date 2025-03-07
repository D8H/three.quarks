/**
 * @jest-environment jsdom
 */
import {QuarksLoader} from '../src';
import {MeshSurfaceEmitter, ParticleEmitter} from '../src';
import {EmitSubParticleSystem} from '../src';
import JSON1 from './subPS.json';
import JSON2 from './meshSurface.json';

describe('QuarksLoader', () => {
    test('#loadSubSystem', () => {
        const loader = new QuarksLoader();
        const object = loader.parse(JSON1, () => {});
        expect(object.children.length).toBe(2);
        expect((object.children[0] as ParticleEmitter<Event>).system.behaviors.length).toBe(1);
        expect(((object.children[0] as ParticleEmitter<Event>).system.behaviors[0] as any).particleSystem).toBe(
            (object.children[0] as ParticleEmitter<Event>).system
        );
        expect(
            ((object.children[0] as ParticleEmitter<Event>).system.behaviors[0] as EmitSubParticleSystem)
                .subParticleSystem
        ).toBe(object.children[1]);
    });

    test('#loadMeshSurfaceEmitter', () => {
        const loader = new QuarksLoader();
        const object = loader.parse(JSON2, () => {});
        expect(object.children.length).toBe(2);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(
            Object.keys(
                ((object.children[1] as ParticleEmitter<Event>).system.emitterShape as MeshSurfaceEmitter).geometry!
                    .attributes
            ).length
        ).toBe(3);
    });
});
