export class ProjectStatus {
    name: string;
    startTime: number;
    totalTime: number;
    running: boolean;

    constructor(name: string) {
        this.name = name;
        this.startTime = this.totalTime = 0;
        this.running = false;
    }

    toggle(): void {
        const now = performance.now();
        this.running = !this.running;
        if (this.running) {
            this.startTime = now;
        } else {
            this.totalTime += now - this.startTime;
        }
    };

    tally(): number {
        if (!this.running) {
            return this.totalTime;
        }

        return this.totalTime + (performance.now() - this.startTime);
    };

    elapsed(): string {
        let total = this.tally();

        const ms = Math.floor(total) % 1000;
        total /= 1000;

        const sec = Math.floor(total) % 60;
        total /= 60;

        const min = Math.floor(total) % 60;
        total /= 60;

        const hrs = Math.floor(total);

        const fmt = (n: number, len: number = 2): string => String(n).padStart(len, '0');

        return `${fmt(hrs)}:${fmt(min)}:${fmt(sec)}.${fmt(ms, 3)}`;
    };
};